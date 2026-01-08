import type { Metadata } from 'next'
import GlobalPlayground from '@/components/playground/GlobalPlayground'

export const metadata: Metadata = {
  title: 'Playground',
  description: 'View and edit your generated UI components.',
}

export default function ResultPage() {
  return (
    <main className='h-screen w-full overflow-hidden'>
      <GlobalPlayground />
    </main>
  )
}
