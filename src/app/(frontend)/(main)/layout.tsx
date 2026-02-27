import Header from '@/components/layout/header'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: "%s | Emerald UI - Inspiration Websites & Components",
    default: "Emerald UI - Inspiration Websites & Components",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex min-h-svh flex-col'>
      <Header />
      {children}
    </div>
  )
}
