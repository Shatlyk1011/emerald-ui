'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

const ThreeDMarquee = ({
  images,
  className,
}: {
  images: string[]
  className?: string
}) => {
  const chunkSize = Math.ceil(images.length / 3)
  const chunks = Array.from({ length: 3 }, (_, colIndex) => {
    const start = colIndex * chunkSize
    return images.slice(start, start + chunkSize)
  })
  return (
    <div
      className={cn(
        'mx-auto block h-140 w-full overflow-hidden rounded-md max-xl:h-120 max-sm:h-100',
        className
      )}
    >
      <div className='flex size-full items-center justify-center'>
        <div className='aspect-square size-180 shrink-0 scale-135 max-xl:size-full max-xl:scale-110 max-sm:scale-130'>
          <div
            style={{ transform: 'rotateX(45deg) rotateY(0deg) rotateZ(45deg)' }}
            className='relative top-0 right-[-55%] grid size-full origin-top-left grid-cols-3 gap-5 max-sm:gap-2 transform-3d max-xl:-top-30 max-xl:right-[-45%] max-sm:top-0'
          >
            {chunks.map((subarray, colIndex) => (
              <motion.figure
                animate={{ y: colIndex % 2 === 0 ? 60 : -60 }}
                transition={{
                  duration: colIndex % 2 === 0 ? 10 : 15,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                key={colIndex + 'marquee'}
                className='flex flex-col items-start gap-6 max-sm:gap-3'
              >
                {subarray.map((src, imageIndex) => (
                  <div className='relative ' key={imageIndex + src}>
                    <motion.img
                      className='aspect-4/3 bg-neutral-100 dark:bg-neutral-900 h-full w-full rounded-lg object-cover select-none'
                      key={imageIndex}
                      src={src}
                      draggable={false}
                      alt={`Image ${imageIndex + 1}`}
                    />
                  </div>
                ))}
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThreeDMarquee
