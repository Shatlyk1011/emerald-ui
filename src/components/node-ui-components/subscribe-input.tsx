'use client';

import { FC, ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import { motion, MotionConfig, Transition } from 'motion/react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { SendHorizonal } from 'lucide-react';

const transition: Transition = {
  type: 'spring',
  bounce: 0.1,
  duration: 0.4,
};

export default function SubscribeInput() {
  const [isOpen, setOpen] = useState(false);

  return (
    <OnClickOutside onClickOutside={() => setOpen(false)}>
      <MotionConfig transition={transition}>
        <motion.div
          animate={{ width: isOpen ? '320px' : '100px' }}
          className={cn("h-12 ", isOpen ? 'w-75' : 'w-20' )}
          initial={false}
        >
          <div className='p-1 h-full border rounded-lg bg-card'>
            {!isOpen ? (
              <Button onClick={() => setOpen(true)} className='w-full h-full rounded-lg'>
                + Sub
              </Button>
            ) : (
              <div className='flex  gap-2 h-full'>
                <div className='flex relative w-full '>
                  <input
                    id="sub"
                    className='bg-card w-full h-full rounded-md p-2 z-10 focus:outline-hidden text-sm -tracking-one'
                    autoComplete='off'
                    placeholder='Email'
                    autoFocus
                  />
                  <motion.label htmlFor="sub" initial={{ bottom: 0, opacity:0 }} animate={{ bottom: -36, opacity: 100 }} transition={{...transition, duration: 1.5, }} className='absolute z-1 flex items-center gap-1 text-[13px] text-nowrap font-medium -tracking-one text-muted-foreground'>
                    Get hand-picked updates
                  </motion.label>
                  <div className='absolute right-1 top-0 flex h-full items-center justify-center'></div>
                </div>
                <Button className='px-6 h-full w-11 rounded-md' onClick={() => setOpen(false)} aria-label='Back'>
                  <SendHorizonal className='size-4'  />
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </MotionConfig>
    </OnClickOutside>

  );
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