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
import './globals.css'
import './tailwind.css'

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
  authors: [{ name: "Shatlyk Abdullayev", url: "https://shatlykabdullayev.com" }],
  creator: "Shatlyk Abdullayev",
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
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
    icon: [{ url: '/icon.png' }],
    apple: [{ url: '/android-chrome-192x192.png', sizes: '192x192' }],
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
