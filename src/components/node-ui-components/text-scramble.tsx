'use client'
import { HTMLAttributes, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface TextScrambleProps extends HTMLAttributes<HTMLDivElement> {
  label: string
  duration?: number
  speed?: number
  characterSet?: string
  classes?: string
  triggerAsDefault?: boolean
  triggerOnHover?: boolean
  onScrambleComplete?: () => void
} 

const defaultChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

export default function TextScramble({
  label,
  duration = 1,
  speed = 0.02,
  characterSet = defaultChars,
  classes,
  triggerAsDefault = true,
  triggerOnHover = false,
  onScrambleComplete,
  ...props
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(label)
  const [isAnimating, setIsAnimating] = useState(false)
  const text = label

  console.log('label', label)

  const scramble = () => {
    if (isAnimating) return
    setIsAnimating(true)

    const steps = duration / speed
    let step = 0

    const interval = setInterval(() => {
      let scrambled = ''
      const progress = step / steps
      console.log('scrambled', scrambled)

      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          scrambled += ' '
          continue
        }

        if (progress * text.length > i) {
          scrambled += text[i]
        } else {
          scrambled +=
            characterSet[Math.floor(Math.random() * characterSet.length)]
        }
      }

      setDisplayText(scrambled)
      step++

      if (step > steps) {
        clearInterval(interval)
        setDisplayText(text)
        setIsAnimating(false)
        onScrambleComplete?.()
      }
    }, speed * 1000)
  }

  useEffect(() => {
    if (triggerAsDefault) {
      scramble()
    }
  }, [])

  return (
    <div onMouseEnter={triggerOnHover ? scramble : undefined} className={cn(classes)} {...props}>
      {displayText}
    </div>
  )
}
