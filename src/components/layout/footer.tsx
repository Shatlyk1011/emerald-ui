import { Github } from 'lucide-react'
import Logo from '../ui/logo'
import Separator from '../ui/separator'
import { GsapComponents, MotionComponents, UsefulLinks } from './footerLinks'
import { siteConfig } from '@/lib/site-config'

export default function Footer() {
  return (
    <footer className='bg-card/80 w-full border-t'>
      <div className='mx-auto max-w-400 px-20 pt-40 pb-24 max-lg:px-16 max-lg:py-16 max-sm:px-5 max-sm:py-12'>
        <div className='flex justify-between gap-8'>

          <div className='mb-4 flex flex-col max-w-max  items-start justify-center gap-0'>
            <Logo
              size='xl'
              classes='text-card-foreground items-start'
              logoColor='text-primary'
            />
            <span className=' -mt-2 ml-11.5 opacity-80'>
              Build by{' '}
              <a
                href={siteConfig.githubRepo}
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-foreground'
              >
                Shatlyk
              </a>
            </span>
          </div>
          <div className='text-sm font-medium text-muted-foreground hover:text-foreground transition  self-end mb-4'>
            <a
              href='https://github.com/Shatlyk1011/emerald-ui'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='GitHub Repository'
              className='flex items-center gap-2'
            >
              Source code
              <Github className='text-current size-4' />
            </a>

          </div>
        </div>

        <Separator className='my-0' />

        <nav className='relative w-full py-12' aria-label='Footer navigation'>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-3'>
            <div>
              <h3 className='mb-4 font-bold'>Motion Components</h3>
              <ul className='space-y-2'>
                {MotionComponents.map(({ href, title }) => (
                  <li key={title}>
                    <a
                      href={href}
                      className='text-muted-foreground hover:text-primary transition-colors before:hidden after:hidden'
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className='mb-4 font-bold'>GSAP Components</h3>
              <ul className='space-y-2'>
                {GsapComponents.map(({ href, title }) => (
                  <li key={title}>
                    <a
                      href={href}
                      className='text-muted-foreground hover:text-primary transition-colors before:hidden after:hidden'
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className='mb-4 font-bold'>Links</h3>
              <ul className='space-y-2'>
                {UsefulLinks.map(({ href, title }) => (
                  <li key={title}>
                    <a
                      href={href}
                      className='text-muted-foreground hover:text-primary transition-colors before:hidden after:hidden'
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </footer>
  )
}
