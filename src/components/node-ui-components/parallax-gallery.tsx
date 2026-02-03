"use client";

/**
 * @author: @nodeui
 * @description: Parallax Gallery Component with Multi-Speed Scrolling Columns
 * @version: 1.0.0
 * @date: 2026-02-03
 * @license: MIT
 * @website: https://nodeui.com
 */

import { useEffect, useState, useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "motion/react";

const DEMO = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=1200&fit=crop",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=1200&fit=crop",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=1200&fit=crop",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=1200&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=1200&fit=crop",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=1200&fit=crop",
  "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=1200&fit=crop",
  "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800&h=1200&fit=crop"
]

interface Props {
  images?: string[];
  className?: string;
  containerHeight?: string;
  backgroundColor?: string;
}

export default function TwoWayParallax ({ images = DEMO }:Props) {
  const gallery = useRef(null);

  const [height, setHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: gallery,
    //when to start and end the animation (related to target element)
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 2.5]);

  useEffect(() => {
    const resize = () => {
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", resize);
    resize();
  }, []);

  if(!images?.length) return null

  return (
    <section className="w-full pb-[10vh] ">

      <div className="pb-[10vh] text-center text-2xl font-medium">Scroll Down</div>

      <div
        ref={gallery}
        className="flex h-[180vh] gap-4 overflow-hidden dark:bg-gray-800  p-4 py-10"
        >
        <Column
          images={[images[0], images[1], images[2]]}
          y={y1}
          classes="top-[-45%]"
          />
        <Column
          images={[images[3], images[4], images[5]]}
          y={y2}
          classes="top-[-95%]"
          />

        <Column
          images={[images[6], images[7], images[8]]}
          y={y3}
          classes="hidden xl:flex top-[-75%]"
          />
      </div>

      <p className="leading-relaxed text-center mt-50">Continue your content here</p>
    </section>
  );
};

type Column = { images: string[]; y: MotionValue<number>; classes: string };

const Column = ({ images, y, classes }: Column) => {
  return (
    <motion.div
      style={{ y }}
      className={`relative flex h-full w-full min-w-45 flex-col gap-4 ${classes}`}
    >
      {images.map((src, idx) => (
        <div
          key={idx}
          className="relative h-full w-full overflow-hidden rounded-md border border-slate-600 bg-slate-600"
        >
          <img src={src} className="object-cover w-full h-full"/>
        </div>
      ))}
    </motion.div>
  );
};


// New parallax gallery