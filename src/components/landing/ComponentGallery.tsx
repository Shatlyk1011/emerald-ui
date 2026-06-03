import type { ReactNode } from 'react'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import ThreeDMarquee from '@/components/emerald-ui-components/3d-marquee'
import AnimatedInput from '@/components/emerald-ui-components/animated-input'
import CheckoutCard from '@/components/emerald-ui-components/cards/checkout-card'
import ProfileCard from '@/components/emerald-ui-components/cards/profile-card'
import SubscribeInput from '@/components/emerald-ui-components/subscribe-input'
import TypingEffect from '@/components/emerald-ui-components/texts/text-typing-effect'

export default function ComponentGallery() {
  return (
    <section
      id='component-gallery'
      className='mx-auto max-w-400 px-10 py-20 max-sm:px-4'
    >
      <div className='mb-8 flex items-end justify-between gap-8 max-md:flex-col max-md:items-start'>
        <div>
          <p className='text-muted-foreground tracking-four mb-2 text-sm font-medium uppercase'>
            Component gallery
          </p>
          <h2 className='max-w-3xl text-4xl font-semibold tracking-[-0.06em] text-balance max-sm:text-3xl'>
            Standalone components.
          </h2>
        </div>
        <Link
          href='/docs'
          className='border-border bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 shrink-0 items-center justify-center rounded-full border px-5 text-sm font-medium shadow-sm transition-colors'
        >
          View all components
        </Link>
      </div>

      <div className='grid auto-rows-[20rem] grid-cols-12 gap-4 max-lg:auto-rows-[14rem] max-md:auto-rows-auto'>
        <BentoCard
          eyebrow='Websites'
          title='3D inspiration wall'
          className='col-span-6 row-span-2 max-lg:col-span-12 max-md:row-span-1'
          contentClassName='overflow-hidden p-0'
        >
          <ThreeDMarquee className='h-full min-h-128 rounded-none max-lg:min-h-96 max-sm:min-h-80' />
        </BentoCard>

        <BentoCard
          eyebrow='Profile'
          title='Creator card'
          className='col-span-3 row-span-2 max-lg:col-span-6 max-lg:row-span-3 max-md:col-span-12 max-md:row-span-1'
          contentClassName='flex items-center justify-center overflow-hidden'
        >
          <div className='scale-[0.68] max-lg:scale-[0.72] max-sm:scale-[0.68]'>
            <ProfileCard
              name='Maya Stone'
              title='Product designer shipping delightful interfaces.'
              followers={8200}
              posts={32}
            />
          </div>
        </BentoCard>

        <BentoCard
          eyebrow='Commerce'
          title='Checkout flow'
          className='col-span-3 row-span-2 max-lg:col-span-6 max-lg:row-span-3 max-md:col-span-12 max-md:row-span-1'
          contentClassName='flex items-center justify-center overflow-hidden'
        >
          <div className='w-full max-w-sm scale-[0.78] max-lg:scale-[0.84] max-sm:scale-[0.8]'>
            <CheckoutCard />
          </div>
        </BentoCard>

        <BentoCard
          eyebrow='Search'
          title='Animated command input'
          className='col-span-4 max-lg:col-span-6 max-md:col-span-12'
          contentClassName='flex items-center'
        >
          <AnimatedInput />
        </BentoCard>

        <BentoCard
          eyebrow='Text'
          title='Typing headline'
          className='col-span-4 max-lg:col-span-6 max-md:col-span-12'
        >
          <div className='flex h-full flex-col justify-center gap-5'>
            <p className='text-muted-foreground text-sm'>Build a system for</p>
            <TypingEffect
              texts={['Design', 'Motion', 'React', 'Launch']}
              className='justify-start text-4xl tracking-[-0.06em]'
            />
          </div>
        </BentoCard>

        <BentoCard
          eyebrow='Updates'
          title='Subscribe interaction'
          className='col-span-4 max-lg:col-span-12'
          contentClassName='flex items-center justify-center'
        >
          <SubscribeInput />
        </BentoCard>
      </div>
    </section>
  )
}

function BentoCard({
  eyebrow,
  title,
  children,
  className,
  contentClassName,
}: {
  eyebrow: string
  title: string
  children: ReactNode
  className?: string
  contentClassName?: string
}) {
  return (
    <article
      className={cn(
        'border-border/70 bg-card/80 flex h-full flex-col overflow-hidden rounded-[2rem] border shadow-sm backdrop-blur',
        className
      )}
    >
      <div className='flex items-center justify-between gap-6 border-b p-5'>
        <div>
          <p className='text-muted-foreground text-xs font-medium tracking-[0.24em] uppercase'>
            {eyebrow}
          </p>
          <h3 className='mt-1 text-xl font-semibold tracking-[-0.04em]'>
            {title}
          </h3>
        </div>
        <Sparkles className='size-5 shrink-0 text-emerald-500' />
      </div>
      <div className={cn('min-h-0 flex-1 p-5', contentClassName)}>
        {children}
      </div>
    </article>
  )
}
