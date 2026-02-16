'use client'

/**
 * @author: @codegrid
 * @description: Link Hover Effect with GSAP
 * @version: 1.0.0
 * @date: 2026-02-16
 * @license: MIT
 * @website: https://emerald-ui.com
 */
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const defaultImg = "https://pyengguphcmeqlelpozr.supabase.co/storage/v1/object/public/images/emilie.webp"

const images = [
  "https://pyengguphcmeqlelpozr.supabase.co/storage/v1/object/public/images/1820productions.webp",
  "https://pyengguphcmeqlelpozr.supabase.co/storage/v1/object/public/images/telhaclarke.webp",
  "https://pyengguphcmeqlelpozr.supabase.co/storage/v1/object/public/images/jonasreymondin.webp",
  "https://pyengguphcmeqlelpozr.supabase.co/storage/v1/object/public/images/www-anima-ai.webp",
  "https://pyengguphcmeqlelpozr.supabase.co/storage/v1/object/public/images/dulcedo-com-.webp",
]

export default function ImageHover() {
  const sectionRef = useRef(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const newImgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
    const previewContainer = previewContainerRef.current;
    const menuLinkItems = document.querySelectorAll(".menu-link-item");

    let lastHoveredIndex: number | null = null;

    const handleMouseOver = (index: number) => {
      if (index !== lastHoveredIndex) {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("temp-image", "absolute", "rotate-[-30deg]", "-left-1/2", "top-[125%]");
        const img = document.createElement("img");
        img.src = images[index];
        img.alt = "";
        img.classList.add("w-full", "h-full", 'object-fill')
        imgContainer.appendChild(img);
        previewContainer!.appendChild(imgContainer);

        gsap.to(imgContainer, {
          top: "0%",
          left: "0%",
          rotate: 0,
          duration: 1.25,
          ease: "power3.out",
          // clean up dom function
          onComplete: () => {
            gsap.delayedCall(2, () => {
              const allImgContainers =
                previewContainer!.querySelectorAll(".temp-image");

              if (allImgContainers.length > 1) {
                Array.from(allImgContainers)
                  .slice(0, -1)
                  .forEach((container) => {
                    setTimeout(() => {
                      container.remove();
                    }, 2000);
                  });
              }
            });
          },
        });

        lastHoveredIndex = index;
      }
    };

    menuLinkItems.forEach((item, index) => {
      item.addEventListener("mouseover", () => handleMouseOver(index));
    });

    return () => {
      menuLinkItems.forEach((item, index) => {
        item.removeEventListener("mouseover", () => handleMouseOver(index));
      });
    };
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className='flex items-center gap-16 w-full h-full p-20 max-md:p-5'>
      <div className='flex-1 '>
        <ul className='flex flex-col  gap-6 text-5xl max-md:text-3xl max-md:gap-2  font-medium text-muted-foreground [&>li]:transition [&>li:hover]:text-foreground flex-1'>
          <li className="menu-link-item">Home</li>
          <li className="menu-link-item">Blog</li>
          <li className="menu-link-item">About</li>
          <li className="menu-link-item">Projects</li>
          <li className="menu-link-item">Contact</li>
        </ul>
      </div>
      <div ref={previewContainerRef} className="flex-2 max-w-90 max-md:max-w-64 min-w-48 rotate-15 left-1/2 [clip-path:polygon(0_0,100%_0,100%_100%,0%_100%)]">
        <img src={defaultImg} className='w-full h-full object-fill' alt="" />

        <div ref={newImgRef} className="rotate-[-30deg] absolute w-full h-full -left-1/2 top-[125%]">
          <img src={images[1]} className='w-full h-full object-fill' alt="" />
        </div>
      </div>
    </section>
  )
}