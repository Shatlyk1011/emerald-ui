import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import BackgroundThreads from '@/components/ui/background-threads'
import { FileUploadInput } from '@/components/FileUpload'

export const metadata: Metadata = {
  title: 'Home',
  description: siteConfig.description,
}

export default function Home() {
  return (
    <main className='items-top mx-auto mb-16 flex h-full min-h-[200vh] w-full max-w-5xl justify-center overflow-x-hidden px-12 pt-30 max-lg:px-8 max-sm:px-4 max-sm:pt-2'>
      <section className='flex w-full flex-col items-center gap-8'>
        <div className='text-center'>
          <h1 className='-tracking-two mb-2 text-4xl font-semibold'>
            Build something great
          </h1>
          <p className='text-primary/70 -tracking-two font-mono text-base'>
            Create apps and websites by chatting with AI
          </p>
        </div>
        <FileUploadInput />
      </section>
      <div className='absolute top-0 left-0 -z-1 h-svh w-full'>
        <BackgroundThreads />
      </div>
    </main>
  )
}
