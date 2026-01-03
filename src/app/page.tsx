import { FileUploadInput } from '@/components/FileUpload'

export default function Home() {
  return (
    <section className='mx-auto mb-16 flex h-full w-full max-w-5xl items-center justify-center px-12 pt-30 max-lg:px-8 max-sm:px-4 max-sm:pt-2'>
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
    </section>
  )
}
