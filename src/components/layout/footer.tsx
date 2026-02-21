import { siteConfig } from "@/lib/site-config";
import Logo from "../ui/logo";
import Separator from "../ui/separator";
import { GsapComponents, MotionComponents, UsefulLinks } from "./footerLinks";

export default function Footer() {
  return (
    <footer className="w-full max-w-400 mx-auto px-6 py-12">
      <div className=" mb-4 gap-4 items-start justify-center flex flex-col">
        <Logo size="xl" classes="text-primary"/>
        <span className="text-muted-foreground">
          Build by{' '}
          <a
            href={siteConfig.github}
            target='_blank' rel='noopener noreferrer'
            className="hover:text-foreground"
            >
            Shatlyk
          </a>
        </span>
      </div>

      <Separator className="my-0"/>

      <nav
        className="w-full py-12"
        aria-label="Footer navigation"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-4">Motion Components</h3>
              <ul className="space-y-2">
                {MotionComponents.map(({href, title}) => (
                  <li key={title}>
                    <a
                      href={href}
                      className="text-neutral-400 hover:text-neutral-200 transition-colors"
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">GSAP Components</h3>
              <ul className="space-y-2">
                {GsapComponents.map(({href, title}) => (
                  <li key={title}>
                    <a
                      href={href}
                      className="text-neutral-400 hover:text-neutral-200 transition-colors"
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Useful Links</h3>
              <ul className="space-y-2">
                {UsefulLinks.map(({href, title}) => (
                  <li key={title}>
                    <a
                      href={href}
                      className="text-neutral-400 hover:text-neutral-200 transition-colors"
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
        </div>
      </nav>
    </footer>
  )
}
