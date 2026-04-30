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
          className='bg-foreground text-background fixed right-10 bottom-10 rounded-full p-4'
        >
          <DialogTrigger>
            <Info className='size-8' />
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
                  key={update.id}
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
