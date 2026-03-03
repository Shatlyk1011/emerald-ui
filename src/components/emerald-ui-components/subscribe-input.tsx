'use client'

import { FC, ReactNode, RefObject, useEffect, useRef, useState } from 'react'
import { SendHorizonal } from 'lucide-react'
import { motion, MotionConfig } from 'motion/react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'

export default function SubscribeInput() {
  const [isOpen, setOpen] = useState(false)

  return (
    <OnClickOutside onClickOutside={() => setOpen(false)}>
      <MotionConfig
        transition={{
          type: 'spring',
          bounce: 0.1,
          duration: 0.4,
        }}
      >
        <motion.div
          animate={{ width: isOpen ? '320px' : '100px' }}
          className={cn('h-12', isOpen ? 'w-75' : 'w-20')}
          initial={false}
        >
          <div className={cn('bg-card h-full rounded-lg p-1', isOpen ? 'border' : '')}>
            {!isOpen ? (
              <Button
                onClick={() => setOpen(true)}
                className='h-full w-full rounded-lg'
              >
                + Sub
              </Button>
            ) : (
              <div className='flex h-full gap-2'>
                <div className='relative flex w-full'>
                  <input
                    id='sub'
                    className='bg-card -tracking-one z-10 h-full w-full rounded-md p-2 text-sm focus:outline-hidden'
                    autoComplete='off'
                    placeholder='Email'
                    autoFocus
                  />
                  <motion.label
                    htmlFor='sub'
                    initial={{ bottom: 0, opacity: 0 }}
                    animate={{ bottom: -36, opacity: 100 }}
                    transition={{
                      type: 'spring',
                      bounce: 0.1,
                      duration: 0.3,
                      delay: 0.15,
                    }}
                    className='-tracking-one text-muted-foreground absolute z-1 flex items-center gap-1 text-[13px] font-medium text-nowrap'
                  >
                    Get hand-picked updates
                  </motion.label>
                  <div className='absolute top-0 right-1 flex h-full items-center justify-center'></div>
                </div>
                <Button
                  className='h-full w-11 rounded-md px-6'
                  onClick={() => setOpen(false)}
                  aria-label='Back'
                >
                  <SendHorizonal className='size-4' />
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </MotionConfig>
    </OnClickOutside>
  )
}

// helper functions

const useClickOutside = (
  ref: RefObject<HTMLDivElement | null>,
  onClickOutside: () => void
) => {
  console.log('here')
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

interface Props {
  children: ReactNode
  onClickOutside: () => void
  classes?: string
}

const OnClickOutside: FC<Props> = ({ children, onClickOutside, classes }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useClickOutside(wrapperRef, onClickOutside)

  return (
    <div ref={wrapperRef} className={cn(classes)}>
      {children}
    </div>
  )
}
