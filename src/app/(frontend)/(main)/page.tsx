import { ArrowRight, Blocks, Code2, Layers3, Sparkles } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import TextShimmer from '@/components/ui/text-shimmer'
import Lightfall from '@/components/Lightfall'
import ComponentGallery from '@/components/landing/ComponentGallery'

export const metadata: Metadata = {
  title: 'Emerald UI - Copy-ready React Components',
  description:
    'Install polished JSX components, motion effects, cards, buttons, inputs, pricing sections, and website inspiration from Emerald UI.',
}

const features = [
  {
    icon: Layers3,
    title: 'Built for collections',
    description:
      'Browse buttons, cards, text effects, forms, GSAP pieces, and full sections.',
  },
  {
    icon: Blocks,
    title: 'Copy-ready JSX',
    description:
      'Each component ships as editable React code instead of a black-box package.',
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
    <main className='bg-background relative mt-14 min-h-screen font-sans'>
      <section className='relative isolate mx-auto -mt-16 flex w-full flex-col items-center overflow-hidden px-10 py-16 text-center max-sm:px-4 max-sm:pt-14'>
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 z-1 overflow-hidden mix-blend-multiply dark:mix-blend-screen'
        >
          <Lightfall
            colors={['#047857', '#059669', '#10b981', '#34d399']}
            speed={0.15}
            streakCount={5}
            streakWidth={0.42}
            streakLength={1.15}
            glow={1.55}
            density={0.78}
            twinkle={0.55}
            zoom={2.9}
            backgroundGlow={0}
            opacity={0.3}
            mixBlendMode='screen'
            alphaFloor={0}
            mouseInteraction={false}
          />
        </div>
        <div className='bg-background/40 dark:bg-background/10 pointer-events-none absolute inset-0 z-2 backdrop-blur-[0.2px]' />
        <div className='from-background pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-linear-to-t to-transparent' />
        <div className='relative z-20 flex min-h-[520px] max-w-5xl flex-col items-center justify-center max-lg:min-h-[440px] max-sm:min-h-[400px]'>
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
              href='/docs/gsap'
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
