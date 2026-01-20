import { CollectionBeforeDeleteHook, withNullableJSONSchemaType } from 'payload'
import { deleteMediaFromUrl } from '../../utils/supabase'

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
            additionalMediaType: null,
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
