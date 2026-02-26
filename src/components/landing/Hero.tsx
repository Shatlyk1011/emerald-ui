import NewsletterSubscribe from '@/components/NewsletterSubscribe'
import TooltipCat from '../TooltipCat'
import ThreeDMarquee from '../ui/3d-marquee'
import { siteConfig } from '@/lib/site-config'

interface Props {
  totalDocs: number
  images: string[]
}

export default function Hero({ totalDocs, images }: Props) {
  return (
    <section className='mb-10 flex items-center justify-between gap-10 max-xl:gap-0 px-20 pb-10 max-2xl:px-6 max-xl:flex-col max-xl:items-start max-xl:px-0 max-lg:py-6 max-sm:mb-6'>
      <div className='relative flex w-full flex-3 flex-col items-start bg-cyan-50/0'>
        <span className='text-xs text-muted-foreground mb-1'>Websites - {totalDocs}+ | Components - {siteConfig.totalComponents}</span>
        <h1 className='-tracking-two mb-2 text-4xl font-semibold'>
          <span className='text-nowrap'>Inspiration Websites &</span><br /> <span className='text-nowrap'>Emerald Components</span> 
        </h1>
        <div className='text-muted-foreground text-base'>
          <p className='mb-2'>
            Explore selected websites and beautiful components
          </p>
          <div className='flex flex-col items-start gap-2'>
            <NewsletterSubscribe />
          </div>
        </div>
      </div>
      <div className='flex-5 max-xl:w-full max-xl:flex-auto'>
        <TooltipCat
          catClasses='scale-70 -right-20'
          containerClasses='max-xl:p-0 max-xl:m-0'
          catGradientClasses='right-15 max-xl:right-18 max-md:hidden'
        >
          <ThreeDMarquee images={images} className='shadow-md' />
        </TooltipCat>
      </div>
    </section>
  )
}
