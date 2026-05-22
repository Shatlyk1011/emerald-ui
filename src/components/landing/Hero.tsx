import { Globe2, Sparkles } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import NewsletterSubscribe from '@/components/NewsletterSubscribe'
import TooltipCat from '../TooltipCat'
import AnimatedNumber from '../emerald-ui-components/animated-number'
import ThreeDMarquee from '../ui/3d-marquee'

interface Props {
  totalDocs: number
  images: string[]
}

export default function Hero({ totalDocs, images }: Props) {
  return (
    <section className='via-background dark:via-background relative overflow-hidden rounded-[2rem] border bg-linear-to-br from-emerald-50/80 to-cyan-50/70 px-8 py-8 shadow-sm max-sm:rounded-3xl max-sm:px-4 max-sm:py-5 dark:from-emerald-950/20 dark:to-cyan-950/20'>
      <div className='pointer-events-none absolute -top-20 left-1/3 h-80 w-80 rounded-full bg-emerald-400/15 blur-3xl' />
      <div className='pointer-events-none absolute right-0 -bottom-24 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl' />

      <div className='relative flex items-center justify-between gap-10 max-xl:flex-col max-xl:items-start max-xl:gap-6'>
        <div className='relative flex w-full flex-3 flex-col items-start'>
          <div className='bg-background/75 mb-5 flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-sm shadow-xs backdrop-blur'>
            <Globe2 className='size-4 text-emerald-500' />
            <span className='text-muted-foreground'>
              Curated website references
            </span>
          </div>

          <h1 className='max-w-2xl text-5xl leading-[0.98] font-semibold tracking-[-0.07em] text-balance max-lg:text-4xl max-sm:text-3xl'>
            Website collections for sharper visual direction.
          </h1>

          <p className='text-muted-foreground mt-5 max-w-xl text-lg leading-8 text-balance max-sm:text-base max-sm:leading-7'>
            Browse hand-picked websites by category and style, preview their
            details, and collect references before building with Emerald UI
            components.
          </p>

          <div className='mt-8 grid w-full max-w-xl grid-cols-2 gap-3 max-sm:grid-cols-1'>
            <div className='bg-background/70 rounded-2xl border p-4 shadow-xs backdrop-blur'>
              <span className='block text-3xl font-semibold tracking-[-0.06em]'>
                <AnimatedNumber
                  value={totalDocs}
                  className='text-3xl font-semibold tracking-[-0.05em]'
                />
                +
              </span>
              <span className='text-muted-foreground text-sm'>
                websites in the library
              </span>
            </div>
            <div className='bg-background/70 rounded-2xl border p-4 shadow-xs backdrop-blur'>
              <span className='block text-3xl font-semibold tracking-[-0.06em]'>
                <AnimatedNumber
                  value={siteConfig.totalComponents}
                  className='text-3xl font-semibold tracking-[-0.05em]'
                />
                +
              </span>
              <span className='text-muted-foreground text-sm'>
                installable components
              </span>
            </div>
          </div>

          <div className='mt-7 flex flex-col items-start gap-2'>
            <div className='text-muted-foreground flex items-center gap-2 text-sm'>
              <Sparkles className='size-4 text-emerald-500' />
              Get hand-picked website and component updates.
            </div>
            <NewsletterSubscribe />
          </div>
        </div>

        <div className='flex-5 max-xl:w-full max-xl:flex-auto'>
          <TooltipCat
            catClasses='scale-70 -right-20'
            containerClasses='max-xl:p-0 max-xl:m-0'
            catGradientClasses='right-15 max-xl:right-18 max-md:hidden'
          >
            <ThreeDMarquee
              images={images}
              className='h-130 rounded-[1.5rem] shadow-md max-xl:h-110 max-sm:h-90'
            />
          </TooltipCat>
        </div>
      </div>
    </section>
  )
}
