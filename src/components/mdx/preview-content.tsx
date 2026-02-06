'use client'

import {
  type RefObject,
  useActionState,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react'
import { CheckCheck, Copy, ShieldAlert, RefreshCw } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { copyComponent } from '@/lib/action'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

function SuccessParticles({
  buttonRef,
}: {
  buttonRef: React.RefObject<HTMLButtonElement>
}) {
  const rect = buttonRef.current?.getBoundingClientRect()
  if (!rect) return null

  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  // Create a unique key for each particle to satisfy the linter
  const particles = Array.from({ length: 6 }, (_, index) => ({
    // eslint-disable-next-line react-hooks/purity
    id: `particle-${index}-${Math.random().toString(36).substr(2, 9)}`,
    index, // Pass index for staggering delay
  }))

  return (
    <AnimatePresence>
      {particles.map((particle) => (
        <motion.div
          animate={{
            scale: [0, 1, 0],
            // eslint-disable-next-line react-hooks/purity
            x: [0, (particle.index % 2 ? 1 : -1) * (Math.random() * 50 + 20)],
            // eslint-disable-next-line react-hooks/purity
            y: [0, -Math.random() * 50 - 20],
          }}
          className='bg-foreground fixed h-1 w-1 rounded-full'
          initial={{
            scale: 0,
            x: 0,
            y: 0,
          }}
          key={particle.id}
          style={{ left: centerX, top: centerY }}
          transition={{
            duration: 0.6,
            delay: particle.index * 0.1, // Use particle.index for delay
            ease: 'easeOut',
          }}
        />
      ))}
    </AnimatePresence>
  )
}

export default function PreviewContent({
  link,
  isBlock = false,
  onReload,
}: {
  link: string
  isBlock?: boolean
  onReload?: () => void
}) {
  const router = useRouter()
  const { theme } = useTheme()
  const [isPending, startTransition] = useTransition()
  const [state, formAction] = useActionState(copyComponent, {
    error: '',
    content: '',
    success: false,
  })
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyClick = async () => {
    if (isBlock) {
      router.push('/sign-in')
      toast.info("Please sign in to copy component", { position: 'top-center' })
      return
    }

    const [folder, filename] = link.split('/')

    startTransition(async () => {
      const formData = new FormData()
      formData.append('folder', folder)
      formData.append('fileName', filename)

      formAction(formData)
    })
  }

  useEffect(() => {
    if (state.success && state.content) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsCopied(true)
      navigator.clipboard.writeText(state.content)

      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    }
  }, [state])

  useEffect(() => {
    if (onReload) {
      onReload()
    }
  }, [theme])

  const copyButtonRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      {isCopied ? (
        <SuccessParticles
          buttonRef={copyButtonRef as RefObject<HTMLButtonElement>}
        />
      ) : null}
      <div className='mt-1 flex w-full items-center justify-between gap-2 sm:mt-0 sm:w-auto'>
        <form
          className='w-full sm:w-auto'
          onSubmit={(e) => {
            e.preventDefault()
            handleCopyClick()
          }}
        >
          <button
            className={cn(
              'relative overflow-hidden',
              'h-7 px-2 text-xs font-medium',
              'bg-foreground',
              'text-background',
              'hover:bg-foreground/90',
              'hover:text-background',
              'transition-all duration-200',
              'group flex items-center justify-center gap-1',
              'rounded-sm',
              'my-0 py-0 shadow-none',
              'w-fit md:w-full',
              isBlock && 'opacity-80'
            )}
            disabled={isPending}
            ref={copyButtonRef}
            type='submit'
          >
            {isCopied ? (
              <CheckCheck className='text-background h-3.5 w-3.5' />
            ) : (
                <>
                {/* if is block and not auth */}
                  {isBlock ? (
                    <ShieldAlert className={cn("h-3.5 w-3.5 transition-all duration-200 group-hover:scale-110")} />
                  ) : (
                      <Copy className="h-3.5 w-3.5 transition-all duration-200 group-hover:rotate-12" />
                  )}
              </>

            )}
            <span>Copy</span>
          </button>
        </form>
        {onReload && (
          <button
            onClick={onReload}
            className={cn(
              'relative overflow-hidden',
              'h-7 px-2 text-xs font-medium',
              'transition-all duration-200',
              'group flex items-center justify-center gap-1',
              'rounded-sm',
              'my-0 py-0 shadow-none',
              'w-fit'
            )}
            type='button'
            aria-label='Reload component'
          >
            <RefreshCw
              className={cn(
                'h-3.5 w-3.5',
                'transition-all duration-300',
                'group-hover:rotate-180'
              )}
            />
          </button>
        )}
      </div>
    </>
  )
}
