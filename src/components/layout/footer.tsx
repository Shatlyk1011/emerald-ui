import Logo from '../ui/logo'
import Separator from '../ui/separator'
import { GsapComponents, MotionComponents, UsefulLinks } from './footerLinks'

export default function Footer() {
  return (
    <footer className='bg-secondary dark:bg-card w-full border-t'>
      <div className='mx-auto max-w-400 px-20 pt-40 pb-24 max-lg:px-16 max-lg:py-16 max-sm:px-5 max-sm:py-12'>
        <div className='mb-4 flex flex-col items-start justify-center gap-0'>
          <Logo
            size='xl'
            classes='text-card-foreground items-start'
            logoColor='text-primary'
          />
          <span className='text-muted-foreground -mt-2 ml-11.5'>
            Build by{' '}
            <a
              href='https://shatlykabdullayev.com/?ref=https://emerald-ui.com'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-foreground'
            >
              Shatlyk
            </a>
          </span>
        </div>

        <Separator className='my-0' />

        <nav className='w-full py-12' aria-label='Footer navigation'>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-3'>
            <div>
              <h3 className='mb-4 font-bold'>Motion Components</h3>
              <ul className='space-y-2'>
                {MotionComponents.map(({ href, title }) => (
                  <li key={title}>
                    <a
                      href={href}
                      className='text-muted-foreground hover:text-primary transition-colors after:hidden'
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
                      className='text-muted-foreground hover:text-primary transition-colors after:hidden'
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className='mb-4 font-bold'>Useful Links</h3>
              <ul className='space-y-2'>
                {UsefulLinks.map(({ href, title }) => (
                  <li key={title}>
                    <a
                      href={href}
                      className='text-muted-foreground hover:text-primary transition-colors after:hidden'
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
