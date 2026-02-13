"use client"

import { cn } from "@/lib/utils"
import { motion, useInView } from "motion/react"
import { useEffect, useRef, useState } from "react"

interface TypingEffectProps {
  texts?: string[]
  className?: string
  rotationInterval?: number
  typingSpeed?: number
}

const DEMO = ["Design", "Development", "Marketing"]

export const TypingEffect = ({
  texts = DEMO,
  className,
  rotationInterval = 3000,
  typingSpeed = 150,
}: TypingEffectProps) => {
  const [displayedText, setDisplayedText] = useState("")
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true })

  const currentText = texts[currentTextIndex % texts.length]

  useEffect(() => {
    if (!isInView) return

    if (charIndex < currentText.length) {
      const typingTimeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentText.charAt(charIndex))
        setCharIndex(charIndex + 1)
      }, typingSpeed  )
      return () => clearTimeout(typingTimeout)
    } else {
      const changeLabelTimeout = setTimeout(() => {
        setDisplayedText("")
        setCharIndex(0)
        setCurrentTextIndex((prev) => (prev + 1) % texts.length)
      }, rotationInterval)
      return () => clearTimeout(changeLabelTimeout)
    }
  }, [
    charIndex,
    currentText,
    isInView,
  ])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative inline-flex items-center justify-center text-center font-bold text-4xl",
        className,
      )}
    >
      {displayedText}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "ml-1 h-[1em] w-1 rounded-sm bg-current",
          // Adjust cursor style as needed
        )}
      />
    </div>
  )
}

export default TypingEffect