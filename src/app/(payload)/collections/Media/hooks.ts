import { CollectionBeforeDeleteHook, CollectionAfterChangeHook } from 'payload';
import { deleteMediaFromUrl } from '../../utils/supabase';





export const beforeDeleteHook: CollectionBeforeDeleteHook = async ({
  req,
  id,
}) => {
  try {
    // Fetch the document to get the mediaUrl before deletion
    const doc = await req.payload.findByID({
      collection: 'media',
      id,
    })

    if (doc?.mediaUrl) {
      // Determine bucket based on file extension
      const isVideo = doc.mediaUrl.match(/\.(mp4|webm|mov|avi|mpeg)$/i)
      const bucket = isVideo ? 'videos' : 'images'

      // Delete the media file from Supabase storage
      await deleteMediaFromUrl(doc.mediaUrl, bucket)

      console.log(`Deleted media file from ${bucket} bucket: ${doc.mediaUrl}`)
    }

    // Clean up references in InspirationWebsites collection
    const referencingWebsites = await req.payload.find({
      collection: 'inspiration-websites',
      where: {
        additionalMedia: {
          equals: id,
        },
      },
    })

    // Update each website to remove the reference
    if (referencingWebsites.docs.length > 0) {
      for (const website of referencingWebsites.docs) {
        await req.payload.update({
          collection: 'inspiration-websites',
          id: website.id,
          data: {
            additionalMedia: null,
          },
        })
      }
      console.log(
        `Cleaned up ${referencingWebsites.docs.length} media reference(s) from InspirationWebsites`
      )
    }
  } catch (error) {
    console.error('Error deleting media file from storage:', error)
  }
}

export const afterChangeHook: CollectionAfterChangeHook = async ({
  doc,
  req,
  operation,
}) => {
  // Only run on create operations
  if (operation === 'create' && doc.pageUrl) {
    try {
      const normalizedUrl = doc.pageUrl.replace(/\/$/, '')
      const urlsToMatch = [normalizedUrl, `${normalizedUrl}/`]

      // Find WebsiteInspiration items with matching pageUrl (ignoring trailing slash)
      const matchingWebsites = await req.payload.find({
        collection: 'inspiration-websites',
        where: {
          pageUrl: {
            in: urlsToMatch,
          },
        },
      })

      // Update each matching website to reference this media
      if (matchingWebsites.docs.length > 0) {
        for (const website of matchingWebsites.docs) {
          await req.payload.update({
            collection: 'inspiration-websites',
            id: website.id,
            data: {
              additionalMedia: doc.id,
            },
          })
        }
        console.log(
          `Linked Media item ${doc.id} to ${matchingWebsites.docs.length} WebsiteInspiration item(s)`
        )
      }
    } catch (error) {
      console.error('Error linking media to website inspiration:', error)
    }
  }

  return doc
}
