"use client"

import { FC } from "react"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

interface Props {
  label: string
  variant?: "primary" | "secondary"
  classes?: string
  animate?: boolean
  delay?: number
}

const MotionButton: FC<Props> = ({
  label,
  classes,
  animate = true,
}) => {
  return (
    <button
      className={cn("bg-background group relative h-auto w-64 cursor-pointer rounded-full border-[none] p-1 outline-none", animate && "translate-y-[80%] ", classes)}
    >
      <span className="circle group-hover:w-full bg-primary m-0 block h-14 w-14 overflow-hidden rounded-full duration-500" aria-hidden="true"></span>
      <div className="icon group-hover:translate-x-[0.4rem] absolute left-4 top-1/2 -translate-y-1/2 translate-x-0  duration-500">
        <ArrowRight className="text-background size-7"  />
      </div>
      <span className="button-text text-foreground group-hover:text-background font-manrope absolute left-2/4 top-2/4 ml-6 -translate-x-2/4 -translate-y-2/4 whitespace-nowrap text-center text-2xl tracking-tight font-medium duration-500">{label}</span>
    </button>
  )
}

export default MotionButton
