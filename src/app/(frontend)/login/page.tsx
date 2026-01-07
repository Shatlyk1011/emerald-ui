import { auth0 } from '@/lib/auth0'
import LoginButton from '@/components/auth/LoginButton'
import LogoutButton from '@/components/auth/LogoutButton'
import Profile from '@/components/auth/Profile'

export default async function LoginPage() {
  const session = await auth0.getSession()
  const user = session?.user

  console.log('user', user)

  return (
    <main className='app-container'>
      <div className='main-card-wrapper'>
        <img
          src='https://cdn.auth0.com/quantum-assets/dist/latest/logos/auth0/auth0-lockup-en-ondark.png'
          alt='Auth0 Logo'
          className='auth0-logo'
        />
        <h1 className='main-title'>Next.js + Auth0</h1>

        <div className='action-card'>
          {user ? (
            <div className='logged-in-section'>
              <p className='logged-in-message'>✅ Successfully logged in!</p>
              <Profile />
              <LogoutButton />
            </div>
          ) : (
            <>
              <p className='action-text'>
                Welcome! Please log in to access your protected content.
              </p>
              <LoginButton />
            </>
          )}
        </div>
      </div>
    </main>
  )
}
