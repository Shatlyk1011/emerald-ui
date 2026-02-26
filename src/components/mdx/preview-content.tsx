'use client'

import { type RefObject, useEffect, useRef, useState } from 'react'
import { CheckCheck, Copy, ShieldAlert, RefreshCw } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import useCopy from '@/hooks/use-copy'
import SuccessParticles from '../ui/success-particles'
import { PackageManagerTabs } from './package-manager-tabs'

export default function PreviewContent({
  link,
  prePath,
  isBlock = false,
  onReload,
}: {
  link: string
    prePath: string
  isBlock?: boolean
  onReload?: () => void
}) {
  const { theme } = useTheme()


  const handleTerminalClick = (packageManager: string) => {
    const [folder, filename] = link.split("/");
    const componentName = filename ? filename : folder;

    let commandToCopy: string;
    const componentAddCommand = `shadcn@latest add ${prePath}/${componentName}`;

    if (packageManager === "pnpm") {
      commandToCopy = `pnpm dlx ${componentAddCommand}`;
    } else if (packageManager === "npm") {
      commandToCopy = `npx ${componentAddCommand}`;
    } else {
      commandToCopy = `bunx --bun ${componentAddCommand}`;
    }

    navigator.clipboard.writeText(commandToCopy);
  };

  const getFileName = () => {
    const [folder, filename] = link.split("/");
    return filename ? filename : folder;
  };

  const { handleCopyClick, isCopied, isPending, isAuthRequired } = useCopy({
    link,
    isBlock,
  })

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
      <div className='flex justify-between gap-10'>
        <div className="w-full sm:w-auto">
          <PackageManagerTabs
            commandName={getFileName()}
            onSelect={handleTerminalClick}
            prePath={prePath}
          />
        </div>
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
      </div>
    </>
  )
}
