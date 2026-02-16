'use client'
import { FC, ReactNode, RefObject, useRef } from 'react'
import { CheckCheck, Copy, ShieldAlert } from 'lucide-react'
import { cn } from '@/lib/utils'
import useCopy from '@/hooks/use-copy'
import SuccessParticles from '../ui/success-particles'

interface Item {
  name: string
  component: ReactNode
  slug: string
}

interface Props {
  items: Item[]
  isBlock?: boolean
}

const GridItem = ({ item, isBlock }: { item: Item; isBlock?: boolean }) => {
  const { handleCopyClick, isAuthRequired, isCopied, isPending } = useCopy({
    link: item.slug,
    isBlock,
  })

  return (
    <CardWrapper
      onClick={handleCopyClick}
      isAuthRequired={isAuthRequired}
      isCopied={isCopied}
      isPending={isPending}
    >
      {item.component}
    </CardWrapper>
  )
}

const GridComponents: FC<Props> = ({ items, isBlock }) => {
  return (
    <div className='w-full px-4 pb-40'>
      <div className='mx-auto grid w-full grid-cols-2 gap-10 max-sm:grid-cols-1'>
        {items.map((btn) => (
          <GridItem key={btn.name} item={btn} isBlock={isBlock} />
        ))}
      </div>
    </div>
  )
}

export default GridComponents

const CardWrapper = ({
  children,
  className,
  onClick,
  isAuthRequired,
  isCopied,
  isPending,
}: {
  children?: React.ReactNode
  className?: string
  onClick?: () => void
  isAuthRequired?: boolean
  isCopied?: boolean
  isPending?: boolean
}) => {
  const copyButtonRef = useRef<HTMLButtonElement>(null)

  return (
    <div
      className={cn(
        'group/btn relative flex min-h-60 w-full items-center justify-center overflow-hidden rounded-xl border max-md:min-h-40',
        className
      )}
    >
      {isCopied ? (
        <SuccessParticles
          buttonRef={copyButtonRef as RefObject<HTMLButtonElement>}
        />
      ) : null}
      <form
        className='absolute top-4 right-4 w-max'
        onSubmit={(e) => {
          e.preventDefault()
          onClick?.()
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
            isAuthRequired && 'opacity-80'
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
              {isAuthRequired ? (
                <ShieldAlert
                  className={cn(
                    'h-3.5 w-3.5 transition-all duration-200 group-hover:scale-110'
                  )}
                />
              ) : (
                <Copy className='h-3.5 w-3.5 transition-all duration-200 group-hover:rotate-12' />
              )}
            </>
          )}
        </button>
      </form>
      <div className='relative z-40'>{children}</div>
    </div>
  )
}
