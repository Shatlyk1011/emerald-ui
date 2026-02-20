import { RootProvider } from 'fumadocs-ui/provider/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from 'sonner'
import { siteConfig } from '@/lib/site-config'
import { Analytics } from '@/components/_providers/analytics'
import { Providers as PostHogProvider } from '@/components/_providers/post-hog'
import TanstackQueryProvider from '@/components/_providers/tanstack-query'
import ThemeProvider from '@/components/_providers/theme-provider'
import { UserProvider } from '@/components/_providers/user-provider'
import './tailwind.css'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  robots: 'index follow',
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
  },

  alternates: {
    types: {
      'application/rss+xml': [
        { url: `${siteConfig.siteUrl}/rss.xml`, title: 'RSS Feed - English' },
      ],
    },
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PostHogProvider>
          <UserProvider>
            <RootProvider search={{ enabled: false }}>
              <ThemeProvider
                attribute='class'
                defaultTheme='system'
                enableSystem
                disableTransitionOnChange
              >
                <TanstackQueryProvider>
                  {children}
                  {modal}
                </TanstackQueryProvider>
              </ThemeProvider>
            </RootProvider>
          </UserProvider>
        </PostHogProvider>
        <Analytics />

        <Toaster position='bottom-right' />
      </body>
    </html>
  )
}
