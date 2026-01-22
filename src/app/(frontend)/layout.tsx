import { RootProvider } from 'fumadocs-ui/provider/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { siteConfig } from '@/lib/site-config'
import TanstackQueryProvider from '@/components/_providers/tanstack-query'
import ThemeProvider from '@/components/_providers/theme-provider'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RootProvider search={{ enabled: false }}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <TanstackQueryProvider>
              {children}
            </TanstackQueryProvider>
          </ThemeProvider>
        </RootProvider>
      </body>
    </html>
  )
}
