import { FC } from 'react'
import { AnimatePresence, motion } from 'motion/react'

interface Props {
  buttonRef: React.RefObject<HTMLButtonElement>
}

const SuccessParticles: FC<Props> = ({ buttonRef }) => {
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
export default SuccessParticles
