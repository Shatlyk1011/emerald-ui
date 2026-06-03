import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Emerald UI, including how Google OAuth user data is collected, used, stored, shared, and deleted.',
  alternates: {
    canonical: '/privacy-policy',
  },
}

const policySections = [
  {
    title: 'Information We Collect',
    items: [
      'Account information you provide or authorize, such as your email address and authentication provider.',
      'Google Sign-In profile information made available by Google OAuth, such as your name, email address, profile image, and Google account identifier when you choose Continue with Google.',
      'Newsletter and contact information you submit, such as your email address and issue-report messages.',
      'Basic usage and device information collected through analytics tools, such as page views, browser type, referring pages, and interaction events.',
    ],
  },
  {
    title: 'How We Use Information',
    items: [
      'Authenticate your account and maintain your signed-in session.',
      'Create and manage your Emerald UI user record.',
      'Send magic links, account-related messages, newsletter updates, and responses to submitted issues.',
      'Improve site reliability, security, content, components, and user experience.',
    ],
  },
  {
    title: 'Google User Data',
    items: [
      'Emerald UI only requests Google OAuth data needed for sign-in and account identification.',
      'We do not request access to Google Drive, Gmail, Calendar, Contacts, or other sensitive Google API content.',
      'Google user data is not sold and is not used for advertising.',
      'Google user data is shared only with service providers that help operate authentication, hosting, databases, analytics, and email delivery, and only as needed to provide the service.',
    ],
  },
  {
    title: 'Storage and Security',
    items: [
      'Authentication data is handled through Supabase, and site records may be stored in Emerald UI databases.',
      'We use reasonable administrative, technical, and organizational safeguards to protect information from unauthorized access, loss, misuse, or disclosure.',
      'No internet service can guarantee absolute security, but we work to limit collection and access to what is necessary.',
    ],
  },
  {
    title: 'Retention and Deletion',
    items: [
      'We keep account and newsletter information only for as long as needed to provide the service, comply with legal obligations, resolve disputes, and maintain security.',
      'You can unsubscribe from newsletter messages when an unsubscribe option is provided.',
      'You can request access, correction, or deletion of your account information by contacting us through the public GitHub repository linked in the site footer.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <main className='bg-background relative mt-14 min-h-screen overflow-hidden font-sans'>
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute top-0 left-1/3 h-120 w-120 rounded-full bg-emerald-400/10 blur-3xl' />
        <div className='absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-300/10 blur-3xl' />
      </div>

      <article className='mx-auto max-w-4xl px-8 py-20 max-sm:px-4 max-sm:py-12'>
        <div className='bg-card/70 mb-10 rounded-[2rem] border p-8 shadow-sm backdrop-blur max-sm:rounded-3xl max-sm:p-5'>
          <p className='text-muted-foreground mb-4 text-sm font-medium'>
            Last updated: June 3, 2026
          </p>
          <h1 className='text-5xl leading-none font-semibold tracking-[-0.07em] text-balance max-sm:text-4xl'>
            Privacy Policy
          </h1>
          <p className='text-muted-foreground mt-5 text-lg leading-8 text-balance max-sm:text-base max-sm:leading-7'>
            This Privacy Policy explains how {siteConfig.name} collects, uses,
            stores, and shares information when you visit {siteConfig.siteUrl},
            sign in, subscribe, or interact with Emerald UI.
          </p>
        </div>

        <div className='space-y-6'>
          {policySections.map((section) => (
            <section
              key={section.title}
              className='bg-card/60 rounded-3xl border p-7 shadow-sm backdrop-blur max-sm:p-5'
            >
              <h2 className='text-2xl font-semibold tracking-[-0.04em]'>
                {section.title}
              </h2>
              <ul className='text-muted-foreground mt-4 list-disc space-y-3 pl-5 leading-7'>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}

          <section className='bg-card/60 rounded-3xl border p-7 shadow-sm backdrop-blur max-sm:p-5'>
            <h2 className='text-2xl font-semibold tracking-[-0.04em]'>
              Cookies and Analytics
            </h2>
            <p className='text-muted-foreground mt-4 leading-7'>
              Emerald UI may use cookies or similar technologies for
              authentication, preferences, analytics, and security. Analytics
              providers, including Google Analytics and PostHog when enabled,
              help us understand aggregate usage patterns and improve the site.
            </p>
          </section>

          <section className='bg-card/60 rounded-3xl border p-7 shadow-sm backdrop-blur max-sm:p-5'>
            <h2 className='text-2xl font-semibold tracking-[-0.04em]'>
              Third-Party Services
            </h2>
            <p className='text-muted-foreground mt-4 leading-7'>
              Emerald UI uses third-party services for authentication, hosting,
              database storage, analytics, and email delivery. Those providers
              process information according to their own privacy terms and our
              configuration of their services.
            </p>
          </section>

          <section className='bg-card/60 rounded-3xl border p-7 shadow-sm backdrop-blur max-sm:p-5'>
            <h2 className='text-2xl font-semibold tracking-[-0.04em]'>
              Changes to This Policy
            </h2>
            <p className='text-muted-foreground mt-4 leading-7'>
              We may update this Privacy Policy when our practices, services, or
              legal requirements change. Updates will be posted on this page
              with a new last-updated date.
            </p>
          </section>

          <section className='bg-card/60 rounded-3xl border p-7 shadow-sm backdrop-blur max-sm:p-5'>
            <h2 className='text-2xl font-semibold tracking-[-0.04em]'>
              Contact
            </h2>
            <p className='text-muted-foreground mt-4 leading-7'>
              For privacy questions or data requests, contact Emerald UI through
              the public repository linked in the footer or visit{' '}
              <Link
                href={siteConfig.githubRepo}
                target='_blank'
                rel='noopener'
                className='text-emerald-600 underline-offset-4 hover:underline dark:text-emerald-400'
              >
                {siteConfig.githubRepo}
              </Link>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  )
}
