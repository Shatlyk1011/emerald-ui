import Logo from "../ui/logo";
import Separator from "../ui/separator";
import { GsapComponents, MotionComponents, UsefulLinks } from "./footerLinks";

export default function Footer() {
  return (
    <footer className="w-full  bg-secondary dark:bg-card border-t">
      <div className="max-w-400 mx-auto px-20 pb-24 pt-40 max-lg:px-16 max-lg:py-16 max-sm:px-5 max-sm:py-12">
        <div className=" mb-4 gap-0 items-start justify-center flex flex-col">
          <Logo size="xl" classes="text-card-foreground items-start" logoColor="text-primary" />
          <span className="text-muted-foreground ml-11.5 -mt-2">
            Build by{' '}
            <a
              href="https://shatlykabdullayev.com/?ref=https://emerald-ui.com"
              target='_blank' rel='noopener noreferrer'
              className="hover:text-foreground"
            >
              Shatlyk
            </a>
          </span>
        </div>

        <Separator className="my-0" />

        <nav
          className="w-full py-12"
          aria-label="Footer navigation"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-4 ">Motion Components</h3>
              <ul className="space-y-2">
                {MotionComponents.map(({ href, title }) => (
                  <li key={title}>
                    <a
                      href={href}
                      className="text-muted-foreground hover:text-primary transition-colors after:hidden"
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 ">GSAP Components</h3>
              <ul className="space-y-2">
                {GsapComponents.map(({ href, title }) => (
                  <li key={title}>
                    <a
                      href={href}
                      className="text-muted-foreground hover:text-primary transition-colors after:hidden"
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 ">Useful Links</h3>
              <ul className="space-y-2">
                {UsefulLinks.map(({ href, title }) => (
                  <li key={title}>
                    <a
                      href={href}
                      className="text-muted-foreground hover:text-primary transition-colors after:hidden"
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
