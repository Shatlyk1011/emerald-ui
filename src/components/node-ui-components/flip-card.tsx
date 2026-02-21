"use client";

import { cn } from "@/lib/utils";
import { FlipHorizontal2 } from "lucide-react";
import { motion } from "motion/react";
import { ReactNode, useState } from "react";

interface FlipCardProps {
  frontContent?: ReactNode;
  backContent?: ReactNode;
  className?: string;
  cardClassName?: string;
  triggerOnHover?: boolean
  direction?: "horizontal" | "vertical";
}

export default function FlipCard({
  frontContent,
  backContent,
  className,
  cardClassName,
  triggerOnHover = false,
  direction = "horizontal",
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  // Rotation axis based on direction
  const rotationAxis = direction === "horizontal" ? "rotateY" : "rotateX";

  return (
    <div
      className={cn(
        "relative h-96 max-w-80 w-full cursor-pointer perspective-[1000px]",
        className
      )}
      onMouseEnter={triggerOnHover ? () => setIsFlipped(true) : undefined}
      onMouseLeave={triggerOnHover ? () => setIsFlipped(false) : undefined}
      onClick={toggleFlip}
      role="button"
    >
      <motion.div
        className={cn(
          "relative h-full w-full transition-all duration-500 transform-3d",
          cardClassName
        )}
        initial={false}
        animate={{ [rotationAxis]: isFlipped ? 180 : 0 }}
      >
        {/* Front */}
        <div className="absolute flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-xl backface-hidden dark:border-zinc-800 dark:bg-zinc-900">
          {frontContent || (
            <>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                <FlipHorizontal2 className="h-8 w-8 text-zinc-900 dark:text-zinc-100" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Work on Click
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Discover what&apos;s hidden on the other side of this card.
              </p>
            </>
          )}
        </div>

        {/* Back */}
        <div
          className="absolute flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-zinc-900 p-6 text-center text-zinc-100 shadow-xl backface-hidden dark:bg-white dark:text-zinc-900"
          style={{
            transform: `${direction === "horizontal" ? "rotateY(180deg)" : "rotateX(180deg)"}`,
          }}
        >
          {backContent || (
            <>
              <h3 className="mb-4 text-xl font-bold">You found it!</h3>
              <p className="mb-8 text-sm opacity-90">
                This side can hold additional details, quick actions, or hidden
                content your users might find useful.
              </p>
              <button className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-zinc-900 transition-opacity hover:opacity-90 dark:bg-zinc-900 dark:text-white">
                Action Button
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
