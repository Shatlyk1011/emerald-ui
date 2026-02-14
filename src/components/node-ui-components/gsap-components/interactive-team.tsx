'use client'

/**
 * @author: @codegrid
 * @description: Interactive Team with GSAP
 * @version: 1.0.0
 * @date: 2026-02-14
 * @license: MIT
 * @website: https://emerald-ui.com
 */
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText);

interface TeamMember {
  name: string
  img: string
}

interface InteractiveTeamProps {
  teamMembers: TeamMember[]
  title?: string
}

export default function InteractiveTeam({
  teamMembers,
  title = 'Dream Team',
}: InteractiveTeamProps) {
  const containerRef = useRef<HTMLElement>(null)
  const profileImagesContainerRef = useRef<HTMLDivElement>(null)
  const profileImagesRef = useRef<(HTMLDivElement | null)[]>([])
  const nameElementsRef = useRef<(HTMLDivElement | null)[]>([])
  const nameHeadingsRef = useRef<(HTMLHeadingElement | null)[]>([])

  useGSAP(
    () => {
      const profileImagesContainer = profileImagesContainerRef.current
      const profileImages = profileImagesRef.current
      const nameElements = nameElementsRef.current
      const nameHeadings = nameHeadingsRef.current.filter(
        (el): el is HTMLHeadingElement => !!el
      )

      nameHeadings.forEach((heading) => {
        const split = new SplitText(heading, { type: 'chars' })
        if (split.chars) {
          split.chars.forEach((char) => {
            char.classList.add('letter', 'relative', 'translate-y-[0%]')
          })
        }
      })

      if (nameElements[0]) {
        const defaultLetters = nameElements[0].querySelectorAll('.letter')
        gsap.set(defaultLetters, { y: '100%' })

        if (window.innerWidth >= 900) {
          profileImages.forEach((img, index) => {
            if (!img) return

            const correspondingName = nameElements[index + 1]
            if (!correspondingName) return

            const letters = correspondingName.querySelectorAll('.letter')

            img.addEventListener('mouseenter', () => {
              gsap.to(img, {
                width: 140,
                height: 140,
                duration: 0.5,
                ease: 'power4.out',
              })

              gsap.to(letters, {
                y: '-100%',
                ease: 'power4.out',
                duration: 0.75,
                stagger: {
                  each: 0.025,
                  from: 'center',
                },
              })
            })

            img.addEventListener('mouseleave', () => {
              gsap.to(img, {
                width: 70,
                height: 70,
                duration: 0.5,
                ease: 'power4.out',
              })

              gsap.to(letters, {
                y: '0%',
                ease: 'power4.out',
                duration: 0.75,
                stagger: {
                  each: 0.025,
                  from: 'center',
                },
              })
            })
          })

          if (profileImagesContainer) {
            profileImagesContainer.addEventListener('mouseenter', () => {
              const defaultLetters =
                nameElements[0]?.querySelectorAll('.letter')
              if (defaultLetters) {
                gsap.to(defaultLetters, {
                  y: '0%',
                  ease: 'power4.out',
                  duration: 0.75,
                  stagger: {
                    each: 0.025,
                    from: 'center',
                  },
                })
              }
            })

            profileImagesContainer.addEventListener('mouseleave', () => {
              const defaultLetters =
                nameElements[0]?.querySelectorAll('.letter')
              if (defaultLetters) {
                gsap.to(defaultLetters, {
                  y: '100%',
                  ease: 'power4.out',
                  duration: 0.75,
                  stagger: {
                    each: 0.025,
                    from: 'center',
                  },
                })
              }
            })
          }
        }
      }

      return () => {
        if (window.innerWidth >= 900) {
          profileImages.forEach((img) => {
            if (!img) return

            img.removeEventListener('mouseenter', () => {})
            img.removeEventListener('mouseleave', () => {})
          })

          if (profileImagesContainer) {
            profileImagesContainer.removeEventListener('mouseenter', () => {})
            profileImagesContainer.removeEventListener('mouseleave', () => {})
          }
        }
      }
    },
    { scope: containerRef, dependencies: [teamMembers] }
  )

  return (
    <section
      className='relative w-full z-10 h-svh bg-[#0f0f0f] text-[#e3e3db] flex flex-col justify-center items-center gap-[2.5em] overflow-hidden px-4'
      ref={containerRef}
    >
      <div
        className='profile-images w-full flex flex-wrap justify-center items-center'
        ref={profileImagesContainerRef}
      >
        {teamMembers.map(({ img, name }, index) => (
          <div
            key={name}
            className='img relative size-18 max-xl:size-14 cursor-pointer will-change-[width,height] p-1.5'
            ref={(el) => {
              profileImagesRef.current[index] = el
            }}
          >
            <img
              src={img}
              className='rounded-lg w-full h-full bg-neutral-600 object-cover'
              alt={`Team member ${name}`}
            />
          </div>
        ))}
      </div>

      <div className='profile-names relative w-full h-29 max-xl:h-22.5 max-lg:h-14.5 overflow-hidden clip-path-[polygon(0_0,100%_0,100%_100%,0_100%)]'>
        <div
          className='name default absolute text-nowrap w-full text-center uppercase text-[6.5rem] font-black tracking-[-0.2rem] leading-none select-none max-xl:text-[5rem] max-lg:text-[3.2rem] -translate-y-full'
          ref={(el) => {
            nameElementsRef.current[0] = el
          }}
        >
          <h1
            ref={(el) => {
              nameHeadingsRef.current[0] = el
            }}
          >
            {title}
          </h1>
        </div>
        {teamMembers.map((person, index) => (
          <div
            key={person.name}
            className='name absolute w-full text-center uppercase text-nowrap text-[6.5rem] max-xl:text-[5rem] max-lg:text-[3.2rem] font-black tracking-[-0.2rem] leading-none text-primary select-none translate-y-full'
            ref={(el) => {
              nameElementsRef.current[index + 1] = el
            }}
          >
            <h1
              ref={(el) => {
                nameHeadingsRef.current[index + 1] = el
              }}
            >
              {person.name}
            </h1>
          </div>
        ))}
      </div>
    </section>
  )
}
