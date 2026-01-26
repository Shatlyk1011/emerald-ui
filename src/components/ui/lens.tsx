"use client";

import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

interface LensProps {
  children: React.ReactNode;
  lensSize?: number;
  position?: {
    x: number;
    y: number;
  };
  isFocusing?: () => void;
  disableZoom?: boolean;
  background?: string;
}

const Lens: React.FC<LensProps> = ({
  children,
  lensSize = 400,
  disableZoom = false,
  background
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isHovering, setIsHovering] = useState(false);
  const [zoomFactor, setZoomFactor] = useState(1.3);

  const [mousePosition, setMousePosition] = useState({ x: 100, y: 100 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disableZoom) return
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-visible z-20 h-full"
      style={{ background: background || 'transparent' }}
      onMouseEnter={() => {
        if (disableZoom) return
        setIsHovering(true);
      }}
      onWheel={(e) => {
        if (disableZoom) return
        // min-max 1.1 - 3
        setZoomFactor((prev) => Math.min(Math.max(prev - e.deltaY * 0.001, 1.1), 3));
      }}
      onMouseLeave={() => {
        if (disableZoom) return
        setIsHovering(false)
      }}
      onMouseMove={handleMouseMove}
    >
      {children}

      <AnimatePresence>
        {isHovering && !disableZoom && (
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.58 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0 overflow-visible"
              style={{
                maskImage: `radial-gradient(circle ${lensSize / 2}px at ${
                  mousePosition.x
                }px ${mousePosition.y}px, black 100%, transparent 100%)`,
                WebkitMaskImage: `radial-gradient(circle ${
                  lensSize / 2
                }px at ${mousePosition.x}px ${
                  mousePosition.y
                }px, black 100%, transparent 100%)`,
                transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
                zIndex: 50,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  transform: `scale(${zoomFactor})`,
                  transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
                }}
              >
                {children}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Lens