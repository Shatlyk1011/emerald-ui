import { ArrowRight, Blocks, Code2, Layers3, Sparkles } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import TextShimmer from '@/components/ui/text-shimmer'
import ComponentGallery from '@/components/landing/ComponentGallery'

export const metadata: Metadata = {
  title: 'Emerald UI - Copy-ready React Components',
  description:
    'Install polished JSX components, motion effects, cards, buttons, inputs, pricing sections, and website inspiration from Emerald UI.',
}

const features = [
  {
    icon: Blocks,
    title: 'Copy-ready JSX',
    description:
      'Each component ships as editable React code instead of a black-box package.',
  },
  {
    icon: Layers3,
    title: 'Built for collections',
    description:
      'Browse buttons, cards, text effects, forms, GSAP pieces, and full sections.',
  },
  {
    icon: Code2,
    title: 'CLI installation',
    description:
      'Open a component, copy the install command, and drop the files into your app.',
  },
]

export default function Home() {
  return (
    <main className='bg-background relative mt-14 min-h-screen overflow-hidden font-sans'>
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute top-0 left-1/2 h-120 w-120 -translate-x-1/2 rounded-full bg-emerald-400/12 blur-3xl' />
        <div className='absolute top-80 -left-24 h-96 w-96 rounded-full bg-cyan-300/12 blur-3xl' />
        <div className='absolute right-0 bottom-80 h-96 w-96 rounded-full bg-amber-300/12 blur-3xl' />
      </div>

      <section className='mx-auto flex max-w-400 flex-col items-center px-10 pt-24 pb-16 text-center max-sm:px-4 max-sm:pt-14'>
        <div className='flex min-h-[520px] max-w-5xl flex-col items-center justify-center max-lg:min-h-[440px] max-sm:min-h-[400px]'>
          <div className='border-border/60 bg-card/70 mb-6 flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-sm shadow-sm backdrop-blur'>
            <Sparkles className='size-4 text-emerald-500' />
            <span className='text-muted-foreground'>Copy-ready React UI</span>
          </div>

          <h1 className='max-w-5xl text-7xl leading-[0.9] font-semibold tracking-[-0.08em] text-balance max-lg:text-5xl max-sm:text-4xl'>
            Ship interfaces faster with{' '}
            <TextShimmer as='span' duration={5} spread={18}>
              Emerald UI.
            </TextShimmer>
          </h1>

          <p className='text-muted-foreground mt-6 max-w-2xl text-xl leading-8 text-balance max-sm:text-base max-sm:leading-7'>
            Install polished JSX components. Edit them like your own.
          </p>

          <div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
            <Link
              href='/docs'
              className='bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium shadow-sm transition-colors'
            >
              Browse Components
              <ArrowRight className='size-4' />
            </Link>
            <Link
              href='/website-collections'
              className='border-border bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-11 items-center justify-center rounded-full border px-6 text-sm font-medium shadow-sm transition-colors'
            >
              Website Collections
            </Link>
          </div>

        </div>
      </section>

      <ComponentGallery />

      <section className='mx-auto max-w-400 px-10 pb-24 max-sm:px-4'>
        <div className='border-border/70 bg-card/70 grid grid-cols-3 overflow-hidden rounded-[2rem] border shadow-sm backdrop-blur max-lg:grid-cols-1'>
          {features.map((feature, index) => {
            const Icon = feature.icon
            const hasDivider = index < features.length - 1

            return (
              <div
                key={feature.title}
                className={`border-border/70 p-8 ${hasDivider ? 'border-r max-lg:border-r-0 max-lg:border-b' : ''}`}
              >
                <Icon className='mb-8 size-8 text-emerald-500' />
                <h3 className='text-xl font-semibold tracking-[-0.04em]'>
                  {feature.title}
                </h3>
                <p className='text-muted-foreground mt-3 leading-7'>
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
