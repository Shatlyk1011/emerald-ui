'use client'

import { useState } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { ArrowUp, Paperclip, Square, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import BackgroundGradient from '../ui/background-gradient'
import { FileUpload, FileUploadContent, FileUploadTrigger } from './ui'
import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from './ui'

// dev environment
// import OpenAI from 'openai';
// import { SYSTEM_PROMPT } from "@/lib/constants"
// const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

function FileUploadInput() {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  const [isFocus, setFocus] = useState(false)
  const router = useRouter()
  const setGeneratedFiles = useAppStore((state) => state.setGeneratedFiles)

  const handleFilesAdded = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles])
  }

  const handleSubmit = async () => {
    if (!input.trim() && files.length === 0) return

    const res = await fetch('https://api.scrnify.com/capture?key=sLofaw2ETcujMegENZ8T0142bL_Kvt25&url=https%3A%2F%2Fwww.bbc.com%2F&type=image&format=jpeg&width=1920&height=1080&waitUntil=firstMeaningfulPaint&blockCookieDefault=true')
    console.log('res', res)
    return 

    setIsLoading(true)
    try {
      // const openai = new OpenAI({
      //   apiKey,
      //   dangerouslyAllowBrowser: true
      // })

      // const completion = await openai.chat.completions.create({
      //   model: 'gpt-4o',
      //   messages: [
      //     { role: 'system', content: SYSTEM_PROMPT },
      //     { role: 'user', content: input },
      //   ],
      //   response_format: { type: 'json_object' },
      // })

      // const content = completion.choices[0].message.content
      // if (content) {
      //   const files = JSON.parse(content)
      //   console.log('files', files)
      //   setGeneratedFiles(files);
      //   router.push("/result");
      // }

      const response = await fetch('/api/generate-ui', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      })

      const result = await response.json()

      if (response.ok && result.success && result.files) {
        setGeneratedFiles(result.files)
        toast.success('UI generated successfully!')
        router.push('/result')
      } else {
        toast.error(result.error || 'Failed to generate UI')
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
      setInput('')
      setFiles([])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <FileUpload
      onFilesAdded={handleFilesAdded}
      accept='.jpg,.jpeg,.png,.pdf,.docx'
    >
      <BackgroundGradient
        containerClassName=' max-w-md w-full'
        isActive={isFocus || !!input}
      >
        <PromptInput
          value={input}
          onValueChange={setInput}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          className='w-full'
        >
          <PromptInputTextarea
            className='min-h-20 rounded-2xl'
            placeholder='Type a message or drop files...'
          />

          {files.length > 0 && (
            <div className='grid grid-cols-2 gap-2 pt-2'>
              {files.map((file, index) => (
                <div
                  key={file.name}
                  className='bg-secondary flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1 text-sm'
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className='flex items-center gap-2'>
                    <Paperclip className='size-4' />
                    <span className='max-w-20 truncate text-sm'>
                      {file.name}
                    </span>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className='hover:bg-secondary/50 rounded-full p-1'
                  >
                    <X className='size-4' />
                  </button>
                </div>
              ))}
            </div>
          )}

          <PromptInputActions className='flex items-center justify-between gap-2 pt-2'>
            <PromptInputAction tooltip='Attach files'>
              <FileUploadTrigger asChild>
                <div className='hover:bg-secondary-foreground/10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-2xl'>
                  <Paperclip className='text-primary size-5' />
                </div>
              </FileUploadTrigger>
            </PromptInputAction>

            <Button
              variant='default'
              size='icon'
              className='h-8 w-8 rounded-full'
              onClick={handleSubmit}
            >
              {isLoading ? (
                <Square className='size-4 fill-current' />
              ) : (
                <ArrowUp className='size-5' />
              )}
            </Button>
          </PromptInputActions>
        </PromptInput>
      </BackgroundGradient>

      <FileUploadContent>
        <div className='flex min-h-50 w-full items-center justify-center backdrop-blur-sm'>
          <div className='bg-background/90 m-4 w-full max-w-full rounded-lg border p-8 shadow-lg'>
            <div className='mb-4 flex justify-center'>
              <svg
                className='text-muted size-8'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10'
                />
              </svg>
            </div>
            <h3 className='mb-2 text-center text-base font-medium'>
              Drop files to upload
            </h3>
            <p className='text-muted-foreground text-center text-sm'>
              Release to add files to your message
            </p>
          </div>
        </div>
      </FileUploadContent>
    </FileUpload>
  )
}

export default FileUploadInput