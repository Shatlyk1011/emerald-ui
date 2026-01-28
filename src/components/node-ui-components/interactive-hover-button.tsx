"use client";

/**
 * @author: @nodeui
 * @description: Interactive Hover Button Component 
 * @version: 1.0.0
 * @date: 2026-01-28
 * @license: MIT
 * @website: https://nodeui.com
*/

import { ArrowRight, Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps {
  text?: string;
  loadingText?: string;
  successText?: string;
  classes?: string
}

export default function InteractiveHoverButton({
  text = "Button",
  loadingText = "Processing...",
  successText = "Complete!",
  classes,
  ...props
}: InteractiveHoverButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const isIdle = status === 'idle'

  const handleClick = () => {
    if (status !== "idle") return;

    setStatus("loading");
    // Simulate async process (for demo purpose only)
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
      }, 3000); // Reset after success
    }, 2000);
  };

  return (
    <motion.button
      className={cn(
        "group relative flex min-w-40 items-center justify-center overflow-hidden rounded-full border bg-background p-2 px-6 font-semibold",
        status === "loading" && "px-2", // Circle shape when loading
        classes
      )}
      onClick={handleClick}
      layout
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      {...props}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key="idle"
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className={cn("h-2 w-2 rounded-full bg-primary transition-all duration-500 group-hover:scale-[40]", !isIdle && 'scale-[40]')} />
          <span className={cn("inline-block transition-all duration-500 group-hover:translate-x-20 group-hover:opacity-0", !isIdle && 'translate-x-20 opacity-0')}>
            {text}
          </span>
          <div className={cn("absolute top-0 left-0 z-10 flex h-full w-full -translate-x-16 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100", !isIdle && 'translate-x-0 opacity-100')}>
            {status === 'idle' ? (
              <>
                <span>{text}</span>
                <ArrowRight className="h-4 w-4" />
              </>
            ) : status === 'loading' ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-background" />
                <span className="text-background">{loadingText}</span>
              </>
            ) : (
              // success
              <>
                <Check className="h-4 w-4" />
                <span>{successText}</span>
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
