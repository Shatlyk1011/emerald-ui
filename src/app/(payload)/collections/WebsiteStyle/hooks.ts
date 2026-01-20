import type { CollectionBeforeChangeHook, CollectionAfterChangeHook } from 'payload'

export const beforeChangeHook: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
}) => {
  // Only run on create operations
  if ((operation === 'create' || operation === 'update') && data.style) {
    const styleValue = data.style.trim()

    if (styleValue.includes(',')) {
      // Split the string by comma
      const styles: string[] =
        styleValue
          .split(',')
          .map((style: string) => style.trim())
          .filter((style: string) => style.length > 0) || []

      if (styles.length > 0) {
        // Create the first style with the current data
        data.style = styles[0]
        data.value = styles[0]
      }

      // Create additional styles for the remaining items
      for (let i = 1; i < styles.length; i++) {
        await req.payload.create({
          collection: 'website-style',
          data: {
            style: styles[i],
            value: styles[i],
            // Copy other fields from data if needed
          },
          req,
        })
      }
    }
  }

  return data
}

export const afterChangeHook: CollectionAfterChangeHook = async ({
  doc,
  req,
  operation,
}) => {
  // Run on both create and update operations
  if ((operation === 'create' || operation === 'update') && doc.value) {
    try {
      // Find all documents with the same value
      const duplicates = await req.payload.find({
        collection: 'website-style',
        where: {
          value: { equals: doc.value },
          id: { not_equals: doc.id },
        },
      })

      // Delete all duplicates
      if (duplicates.docs.length > 0) {
        for (const duplicate of duplicates.docs) {
          await req.payload.delete({
            collection: 'website-style',
            id: duplicate.id,
            req,
          })
        }
        console.log(
          `Removed ${duplicates.docs.length} duplicate(s) for value: ${doc.value}`
        )
      }
    } catch (error) {
      console.error('Error removing duplicates:', error)
    }
  }

  return doc
}
