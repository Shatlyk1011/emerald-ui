import NewsletterSubscribe from '@/components/NewsletterSubscribe'
import ThreeDMarquee from '../ui/3d-marquee'
import { Button } from '../ui/button'
import TooltipCat from '../TooltipCat'

interface Props {
  totalDocs: number
  openDialog: () => void
  images: string[]
}

export default function Hero({ totalDocs, openDialog, images }: Props) {
  return (
    <section className='mb-10 flex items-center justify-between gap-10 px-20 pb-10 max-2xl:px-6 max-xl:flex-col max-xl:items-start max-xl:px-0 max-lg:py-6 max-sm:mb-6'>
      <div className='relative flex w-full flex-3 flex-col items-start bg-cyan-50/0'>
        <h1 className='-tracking-two mb-2 text-5xl font-semibold'>
          Node Inspiration <br className='hidden max-lg:block' /> Websites (
          {totalDocs})
        </h1>
        <div className='text-muted-foreground text-lg'>
          <p className='mb-2'>
            Explore selected websites for your next design.
          </p>
          <Button
            className='mt-1 text-sm'
            onClick={openDialog}
          >
            Submit website
          </Button>
        </div>

        {/* <NewsletterSubscribe /> */}
      </div>
      <div className='flex-5 max-xl:w-full max-xl:flex-auto'>
        <TooltipCat catClasses='scale-70 -right-20' containerClasses='max-xl:p-0 max-xl:m-0' catGradientClasses='right-15 max-xl:right-18 max-md:hidden'>
          <ThreeDMarquee images={images} className='shadow-md' />
        </TooltipCat>
      </div>
    </section>
  )
}
