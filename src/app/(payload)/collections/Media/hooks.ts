import { CollectionBeforeDeleteHook } from 'payload'
import { deleteMediaFromUrl } from '../../utils/supabase'

export const beforeDeleteHook: CollectionBeforeDeleteHook = async ({ req, id }) => {
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
  } catch (error) {
    console.error('Error deleting media file from storage:', error)
    // Don't throw - we don't want to block deletion if storage cleanup fails
  }
}
