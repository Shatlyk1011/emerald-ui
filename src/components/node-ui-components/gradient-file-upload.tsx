'use client'

/**
 * @author: @emerald-ui
 * @description: A modern file upload input with drag-and-drop, animated gradient border, and AI-style prompt textarea.
 * @version: 1.0.0
 * @date: 2026-02-17
 * @license: MIT
 * @website: https://emerald-ui.com
 */
import { useCallback, useRef, useState } from 'react'
import {
  ArrowUp,
  Paperclip,
  X,
  FileText,
  ImageIcon,
  Film,
  File as FileIcon,
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

// ─── Types ──────────────────────────────────────────────────────────────────

interface FileUploadInputProps {
  /** Placeholder text for the textarea */
  placeholder?: string
  /** Accepted file types (e.g. "image/*,.pdf") */
  accept?: string
  /** Allow multiple file selection */
  multiple?: boolean
  /** Maximum number of files allowed */
  maxFiles?: number
  /** Maximum file size in bytes (default 10MB) */
  maxFileSize?: number
  /** Called when the user submits the message and/or files */
  onSubmit?: (data: { message: string; files: File[] }) => void
  /** Additional class name for the outer container */
  className?: string
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function getFileIcon(file: File) {
  if (file.type.startsWith('image/'))
    return <ImageIcon className='size-4 shrink-0' />
  if (file.type.startsWith('video/'))
    return <Film className='size-4 shrink-0' />
  if (file.type.includes('pdf')) return <FileText className='size-4 shrink-0' />
  return <FileIcon className='size-4 shrink-0' />
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// ─── Animated Background Gradient ───────────────────────────────────────────

function GradientBorder({
  children,
  isActive,
  className,
}: {
  children: React.ReactNode
  isActive: boolean
  className?: string
}) {
  const variants = {
    initial: { backgroundPosition: '0 50%' },
    animate: { backgroundPosition: ['0, 50%', '100% 50%', '0 50%'] },
  }

  return (
    <div className={cn('relative p-px', className)}>
      <motion.div
        variants={variants}
        initial='initial'
        animate='animate'
        transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
        style={{ backgroundSize: '200% 200%' }}
        className={cn(
          'absolute inset-0 z-1 rounded-3xl blur-lg transition duration-500 will-change-transform',
          'bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]',
          isActive ? 'opacity-100' : 'opacity-60'
        )}
      />
      <motion.div
        variants={variants}
        initial='initial'
        animate='animate'
        transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
        style={{ backgroundSize: '400% 400%' }}
        className={cn(
          'absolute inset-0 z-1 rounded-3xl will-change-transform',
          'bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]'
        )}
      />
      <div className='relative z-10 w-full'>{children}</div>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function FileUploadInput({
  placeholder = 'Type a message or drop files...',
  accept = 'image/*,.pdf,.doc,.docx,.txt',
  multiple = true,
  maxFiles = 5,
  maxFileSize = 10 * 1024 * 1024,
  onSubmit,
  className,
}: FileUploadInputProps) {
  const [input, setInput] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [isFocused, setIsFocused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dragCounter = useRef(0)

  const isActive = isFocused || !!input || files.length > 0 || isDragging

  // — File validation & addition
  const addFiles = useCallback(
    (incoming: File[]) => {
      setError(null)

      const filtered = incoming.filter((f) => {
        if (f.size > maxFileSize) {
          setError(`"${f.name}" exceeds ${formatSize(maxFileSize)} limit`)
          return false
        }
        return true
      })

      setFiles((prev) => {
        const combined = [...prev, ...filtered]
        if (combined.length > maxFiles) {
          setError(`Maximum ${maxFiles} files allowed`)
          return combined.slice(0, maxFiles)
        }
        return combined
      })
    },
    [maxFiles, maxFileSize]
  )

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setError(null)
  }

  // — Drag & drop handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current++
    if (e.dataTransfer.items?.length) setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current--
    if (dragCounter.current === 0) setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    dragCounter.current = 0
    const droppedFiles = Array.from(e.dataTransfer.files)
    if (droppedFiles.length) addFiles(droppedFiles)
  }

  // — Submit
  const handleSubmit = () => {
    if (!input.trim() && files.length === 0) return
    toast.success(`Submit with: ${input}`, { position: 'top-center' })
    // onSubmit?.({ message: input, files })
    setInput('')
    setFiles([])
  }

  // — File input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || [])
    if (selected.length) addFiles(selected)
    e.target.value = ''
  }

  return (
    <GradientBorder
      isActive={isActive}
      className={cn('w-full max-w-xl', className)}
    >
      <TooltipProvider>
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => textareaRef.current?.focus()}
          className={cn(
            'border-input bg-background relative flex cursor-text flex-col rounded-3xl border p-2.5 shadow-xs',
            'dark:border-neutral-800 dark:bg-neutral-950',
            'min-h-20 w-full'
          )}
        >
          {/* Drag overlay */}
          <AnimatePresence>
            {isDragging && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='bg-primary/5 border-primary/40 absolute inset-0 z-20 flex items-center justify-center rounded-3xl border-2 border-dashed'
              >
                <span className='text-primary text-sm font-medium'>
                  Drop files here
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* File chips */}
          <AnimatePresence>
            {files.length > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className='mb-2 flex flex-wrap gap-2 overflow-hidden'
              >
                {files.map((file, i) => (
                  <motion.div
                    key={`${file.name}-${i}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className={cn(
                      'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs',
                      'bg-muted/60 text-foreground dark:bg-neutral-800 dark:text-neutral-200'
                    )}
                  >
                    {getFileIcon(file)}
                    <span className='max-w-24 truncate'>{file.name}</span>
                    <span className='text-muted-foreground'>
                      {formatSize(file.size)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removeFile(i)
                      }}
                      className='text-muted-foreground hover:text-foreground ml-0.5 transition-colors'
                    >
                      <X className='size-3.5' />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className='text-destructive mb-1 px-1 text-xs'
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Textarea */}
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit()
              }
            }}
            className='h-full min-h-30 w-full resize-none rounded-2xl border-none bg-transparent font-mono shadow-none outline-none placeholder:font-mono focus-visible:ring-0 focus-visible:ring-offset-0'
            placeholder={placeholder}
          />

          {/* Actions */}
          <div className='flex items-center justify-between gap-2 pt-2'>
            {/* Attach button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type='button'
                  variant='ghost'
                  size='icon'
                  className='h-8 w-8 rounded-full'
                  onClick={(e) => {
                    e.stopPropagation()
                    fileInputRef.current?.click()
                  }}
                >
                  <Paperclip className='size-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent side='top'>Attach files</TooltipContent>
            </Tooltip>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type='file'
              accept={accept}
              multiple={multiple}
              onChange={handleFileChange}
              className='hidden'
            />

            {/* Submit button */}
            <Button
              variant='default'
              size='icon'
              className='h-8 w-8 rounded-full'
              onClick={(e) => {
                e.stopPropagation()
                handleSubmit()
              }}
              disabled={!input.trim() && files.length === 0}
            >
              <ArrowUp className='size-5' />
            </Button>
          </div>
        </div>
      </TooltipProvider>
    </GradientBorder>
  )
}
