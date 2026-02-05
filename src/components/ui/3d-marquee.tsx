"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const ThreeDMarquee = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
  }) => {
  const chunkSize = Math.ceil(images.length / 3);
  const chunks = Array.from({ length: 3 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return images.slice(start, start + chunkSize);
  });
  return (
    <div
      className={cn(
        "mx-auto block w-full h-140 rounded-md overflow-hidden max-sm:h-100 max-xl:h-120",
        className,
      )}
    >
      <div className="flex size-full items-center justify-center">
        <div className="size-180 aspect-square shrink-0 scale-135 max-xl:scale-110 max-sm:scale-130 max-xl:size-full ">
          <div
            style={{ transform: "rotateX(45deg) rotateY(0deg) rotateZ(45deg)" }}
            className="relative top-0 max-xl:-top-30 max-sm:top-0 max-xl:right-[-45%] right-[-55%] grid size-full origin-top-left grid-cols-3 gap-5 transform-3d"
          >
            {chunks.map((subarray, colIndex) => (
              <motion.div
                animate={{ y: colIndex % 2 === 0 ? 60 : -60 }}
                transition={{
                  duration: colIndex % 2 === 0 ? 10 : 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                key={colIndex + "marquee"}
                className="flex flex-col items-start gap-6"
              >
                {subarray.map((src, imageIndex) => (
                  <div className="relative" key={imageIndex + src}>
                    <motion.img
                      className="aspect-4/3 rounded-lg select-none object-cover w-full h-full"
                      key={imageIndex}
                      src={src}
                      draggable={false}
                      alt={`Image ${imageIndex + 1}`}
                    />
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeDMarquee