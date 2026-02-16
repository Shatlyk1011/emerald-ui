'use client'
import { type JSX, useEffect, useState } from 'react'
import { motion, MotionProps } from 'motion/react'
import { cn } from '@/lib/utils'

export type TextScrambleProps = {
  children: string
  duration?: number
  speed?: number
  characterSet?: string
  as?: React.ElementType
  classes?: string
  triggerAsDefault?: boolean
  triggerOnHover?: boolean
  onScrambleComplete?: () => void
} & MotionProps

const defaultChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

export default function TextScramble({
  children,
  duration = 1,
  speed = 0.02,
  characterSet = defaultChars,
  classes,
  as: Component = 'p',
  triggerAsDefault = true,
  triggerOnHover = false,
  onScrambleComplete,
  ...props
}: TextScrambleProps) {
  const MotionComponent = motion.create(
    Component as keyof JSX.IntrinsicElements
  )
  const [displayText, setDisplayText] = useState(children)
  const [isAnimating, setIsAnimating] = useState(false)
  const text = children

  const scramble = async () => {
    if (isAnimating) return
    setIsAnimating(true)

    const steps = duration / speed
    let step = 0

    const interval = setInterval(() => {
      let scrambled = ''
      const progress = step / steps

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
    // @ts-expect-error valid props
    <MotionComponent
      onMouseEnter={triggerOnHover ? scramble : undefined}
      className={cn(classes)}
      {...props}
    >
      {displayText}
    </MotionComponent>
  )
}
