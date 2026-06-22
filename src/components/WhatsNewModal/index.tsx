import { TooltipTrigger } from '@radix-ui/react-tooltip'
import { Info } from 'lucide-react'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { ScrollArea } from '../ui/scroll-area'
import { Tooltip, TooltipContent } from '../ui/tooltip'

const UPDATES = [
  {
    id: '11',
    date: '2026-06-22',
    title: 'Scroll Float',
    description:
      'Pinned editorial titles release their letters upward as the page scrolls',
    link: '/docs/gsap/components/scroll-float',
  },
  {
    id: '10',
    date: '2026-06-07',
    title: 'Vanishing Mouse Trail',
    description:
      'A mouse-driven image trail that spawns image frames and sends them backward in 3D space until they vanish',
    link: '/docs/gsap/components/vanishing-mouse-trail',
  },
  {
    id: '9',
    date: '2026-06-07',
    title: 'Title Mask Effect — Hover Trigger',
    description:
      'Extended Title Mask Effect with an optional hover trigger mode alongside the existing scroll-driven animation',
    link: '/docs/gsap/components/title-mask-effect',
  },
  {
    id: '8',
    date: '2026-06-05',
    title: 'Pinned Scroll Fan',
    description:
      'A scroll-pinned editorial fan gallery — stacked cards that rotate and reveal through an arc as you scroll',
    link: '/docs/gsap/components/pinned-scroll-fan',
  },
  {
    id: '7',
    date: '2026-06-05',
    title: 'Perspective Story Card',
    description:
      'A cursor-reactive perspective card layered over oversized editorial typography',
    link: '/docs/gsap/components/perspective-story-card',
  },
  {
    id: '6',
    date: '2026-06-04',
    title: 'Title Mask Effect',
    description:
      'A scroll-triggered, smoothly animated title mask effect using GSAP and ScrollTrigger',
    link: '/docs/gsap/components/title-mask-effect',
  },
  {
    id: '5',
    date: '2026-06-03',
    title: 'Add Privacy Page',
    description: 'Add privacy policy page with github link',
    link: '/privacy-policy',
  },
  {
    id: '4',
    date: '2026-06-02',
    title: 'Site Update',
    description: 'Updated main page UI.',
  },
  {
    id: '3',
    date: '2026-04-30',
    title: 'Voice Record Components',
    description:
      'A dynamic voice recorder component with waveform visualization',
    link: '/docs/components/voice-record',
  },
  {
    id: '2',
    date: '2026-04-20',
    title: 'Tooltip Cat Component',
    description: 'A playful cat tooltip component that sleeps until hovered',
    link: '/docs/components/tooltip-cat',
  },
  {
    id: '1',
    date: '2026-04-16',
    title: 'Projects Section',
    description:
      'A scroll-triggered, smoothly animated projects section using GSAP and ScrollTrigger. It highlights items one by one with a parallax feel',
    link: '/docs/gsap/components/gsap-projects-section',
  },
]

const WhatsNewModal = () => {
  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger
          asChild
          className='bg-foreground text-background fixed right-10 bottom-10 rounded-full p-2'
        >
          <DialogTrigger>
            <Info className='size-6' />
          </DialogTrigger>
        </TooltipTrigger>

        <TooltipContent className='text-sm font-medium'>
          What&apos;s New
        </TooltipContent>

        <DialogContent className='max-w-lg'>
          <DialogHeader>
            <DialogTitle className='text-xl'>What&apos;s new</DialogTitle>
          </DialogHeader>

          <ScrollArea>
            <ul className='max-h-160 flex-1 space-y-10 p-5'>
              {UPDATES.map((update) => (
                <li
                  key={update.title}
                  className='border-muted relative border-l-2 pl-4'
                >
                  <span className='bg-foreground absolute top-1 -left-[5px] h-2 w-2 rounded-full' />
                  <div className='flex flex-col gap-1'>
                    <span className='text-muted-foreground font-mono text-sm font-medium'>
                      {update.date}
                    </span>
                    <h3 className='text-base leading-tight font-medium'>
                      {update.title}
                    </h3>

                    <p className='text-muted-foreground max-w-[80%] text-sm'>
                      {update.description}
                    </p>
                    {update.link && (
                      <Link
                        href={update.link}
                        className='text-primary mt-1 inline-flex w-fit items-center gap-1 font-mono text-xs hover:underline'
                      >
                        View details
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </DialogContent>
      </Tooltip>
    </Dialog>
  )
}
export default WhatsNewModal
