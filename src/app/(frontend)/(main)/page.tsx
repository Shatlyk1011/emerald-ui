import { FileUploadInput } from '@/components/FileUpload'
import BackgroundThreads from '@/components/ui/background-threads'

export default function Home() {
  return (
    <main className='mx-auto mb-16 flex h-full w-full max-w-5xl min-h-[200vh] items-top justify-center px-12 pt-30 max-lg:px-8 max-sm:px-4 max-sm:pt-2 overflow-x-hidden'>
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
      <div className='absolute top-0 left-0 w-full h-svh -z-1'>
        <BackgroundThreads />
      </div> 
    </main>
  )
}
