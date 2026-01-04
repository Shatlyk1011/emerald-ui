import { PayloadRequest } from 'payload'

export const syncUser = async (req: PayloadRequest): Promise<Response> => {
  const { payload } = req

  // Verify API key
  const authHeader = req.headers.get('Authorization')
  const apiKey = authHeader?.replace('Bearer ', '')

  if (!apiKey) {
    return Response.json({ error: 'Missing API key' }, { status: 401 })
  }

  // Validate API key
  const validKey = await payload.find({
    collection: 'api-keys',
    where: {
      key: {
        equals: apiKey,
      },
    },
  })

  if (validKey.docs.length === 0) {
    return Response.json({ error: 'Invalid API key' }, { status: 401 })
  }

  // Get user data from request body
  // @ts-expect-error valid?
  const body = await req.json()
  console.log('req body', body)
  const { auth0Id, email, name, picture, provider, ip } = body

  if (!auth0Id || !email) {
    return Response.json(
      { error: 'Missing required fields: auth0Id, email' },
      { status: 400 }
    )
  }

  try {
    // Check if user exists
    const existingUser = await payload.find({
      collection: 'users',
      where: {
        auth0Id: {
          equals: auth0Id,
        },
      },
    })

    let user

    if (existingUser.docs.length > 0) {
      // Update existing user
      user = await payload.update({
        collection: 'users',
        id: existingUser.docs[0].id,
        data: {
          email,
          name,
          picture,
          provider,
          lastLogin: new Date().toISOString(),
          loginHistory: [
            ...(existingUser.docs[0].loginHistory || []),
            {
              timestamp: new Date().toISOString(),
              ip,
            },
          ],
        },
      })
    } else {
      // Create new user
      user = await payload.create({
        collection: 'users',
        data: {
          auth0Id,
          email,
          name,
          picture,
          provider,
          lastLogin: new Date().toISOString(),
          loginHistory: [
            {
              timestamp: new Date().toISOString(),
              ip,
            },
          ],
        },
      })
    }

    return Response.json({ success: true, user }, { status: 200 })
  } catch (error) {
    console.error('Error syncing user:', error)
    return Response.json({ error: 'Failed to sync user' }, { status: 500 })
  }
}
