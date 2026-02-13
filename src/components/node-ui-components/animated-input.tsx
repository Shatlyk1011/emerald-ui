'use client'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const DYNAMIC_LABELS = [
  'emerald ui',
  'website inspirations',
  'component generation',
  'ui design',
]

export default function AnimatedInput() {
  const [labelIndex, setLabelIndex] = useState(0)
  const [inputFocus, setInputFocus] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const label = DYNAMIC_LABELS[labelIndex]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='w-full max-w-lg'
    >
      <form
        onSubmit={handleSearch}
        className='relative h-12 w-full max-md:mx-auto max-md:h-10 max-md:w-[90%]'
      >
        <Input
          autoComplete='off'
          className='peer border-foreground/10 placeholder:text-ring h-full w-full rounded-full border bg-transparent! pl-10 text-base placeholder:font-[inherit] placeholder:text-base placeholder:leading-12'
          placeholder={inputFocus ? `Search` : 'Search'}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          id='search'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        {/* input placeholder */}
        <label
          htmlFor='search'
          className='text-ring absolute top-1/2 left-4 -translate-y-1/2 cursor-text text-base select-none'
        >
          {!inputFocus && !searchValue ? (
            <div className='flex items-center gap-1.5'>
              <Search className='h-5 w-5 text-inherit' />
              <TypingEffect
                labelIndex={labelIndex}
                setLabelIndex={setLabelIndex}
                text={label}
                isInView={!inputFocus}
                classes={cn(
                  // IMPORTANT: if you change placeholder, make sure to adjust "left" className
                  'leading-inherit left-[52px]  inline-block text-base peer-focus:hidden transition'
                )}
              />
            </div>
          ) : (
            <Search className='h-5 w-5 text-current max-sm:h-4 max-sm:w-4' />
          )}
        </label>
        <div className='absolute top-1/2 right-1 h-full -translate-y-1/2 py-1'>
          <Button
            type='submit'
            variant={'default'}
            className='h-[inherit] rounded-full px-6'
          >
            Search
          </Button>
        </div>
      </form>
    </motion.div>
  )
}

// Typing Effect
interface Props {
  labelIndex: number
  text: string
  setLabelIndex: Dispatch<SetStateAction<number>>
  isInView: boolean
  classes?: string
}

const TypingEffect: FC<Props> = ({
  labelIndex,
  setLabelIndex,
  text,
  isInView,
  classes,
}) => {
  const [displayedText, setDisplayedText] = useState('')
  const [i, setI] = useState(0)

  useEffect(() => {
    if (!isInView) return

    if (i < text.length) {
      const typingTimeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(i))
        setI(i + 1)
      }, 150)
      return () => clearTimeout(typingTimeout)
    } else {
      const changeLabelTimeout = setTimeout(() => {
        setDisplayedText('')
        setI(0)
        setLabelIndex((prev) => (prev + 1) % 3)
      }, 3000)
      return () => clearTimeout(changeLabelTimeout)
    }
  }, [i, labelIndex, isInView])

  return (
    <div className={cn('relative text-center', classes)}>
      {displayedText || ''}
      {/* line  */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.2,

          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className={cn(
          'absolute top-[50%] -right-[4px] h-[75%] w-[1px] translate-y-[-50%] rounded-sm bg-current'
        )}
      ></motion.span>
    </div>
  )
}
