'use client'
import { useRef, useEffect } from 'react'
import { motion, useSpring, useTransform, useInView } from 'motion/react'
import { cn } from '@/lib/utils'

interface AnimatedNumberProps {
  value: number
  className?: string
  springOptions?: { stiffness?: number; damping?: number; mass?: number }
  asElement?: keyof typeof motionComponents
}

const motionComponents = {
  span: motion.span,
  div: motion.div,
  p: motion.p,
}

export default function AnimatedNumber({
  value,
  className,
  springOptions,
  asElement = 'span',
}: AnimatedNumberProps) {
  const MotionComponent = motionComponents[asElement] || motion.span

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10px' })

  const spring = useSpring(0, springOptions || { stiffness: 50, damping: 15 })
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  )

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, spring, value])

  return (
    <MotionComponent
      ref={ref}
      className={cn('tracking-tighter tabular-nums', className)}
    >
      {display}
    </MotionComponent>
  )
}
