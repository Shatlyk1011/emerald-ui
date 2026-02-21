'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

const Addresses = [
  [
    {
      city: 'New York',
      address: ['123 Creative Hub,', '5th Avenue, Suite 101', 'New York, NY, 10010', 'USA'],
    },
    {
      city: 'Tokyo',
      address: ['Innovators Tower,', 'Shibuya City, 8th Floor', 'Tokyo, 150-0001', 'Japan'],
    },
  ],
  [
    {
      city: 'London',
      address: ['Design District,', 'Greenwich Peninsula', 'London, SE10 0ER', 'UK'],
    },
    {
      city: 'Singapore',
      address: ['Marina Bay Financial Center,', '10 Marina Blvd, Tower 2', 'Singapore, 018983', 'Singapore'],
    },
  ],
] 

const SocialLinks = [
  { title: 'Instagram', href: '#' },
  { title: 'LinkedIn', href: '#' },
  { title: 'Twitter', href: '#' },
  { title: 'Behance', href: '#' },
  { title: 'Dribbble', href: '#' },
];
function FooterKeepItTouch({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        'w-full bg-white text-zinc-950 transition-colors duration-500 ease-in-out dark:bg-zinc-950 dark:text-zinc-50',
        className
      )}
      id="contact"
    >
      <div className="container mx-auto px-6 pb-6 pt-12 max-md:px-4 max-md:pb-4 max-md:pt-8">
        <div className="max-md:mb-8 flex items-center gap-4 mb-12 max-md:gap-2">
          <ArrowRight className="-rotate-45 max-md:size-5 size-6" />
          <p className="text-lg font-medium md:text-xl">Contact</p>
        </div>

        <div className="mb-10">
          <h1 className="max-md:text-5xl font-light tracking-tight max-lg:text-7xl text-8xl">
            Keep in touch
          </h1>
        </div>

        <div className="max-md:py-12 py-16">
          <p className="mb-4 text-zinc-500 transition-colors duration-500 dark:text-zinc-400">
            We’d love to hear from you
          </p>
          <h2 className="bg-linear-to-r from-emerald-500  to-emerald-300  bg-clip-text max-md:text-4xl font-semibold text-transparent max-lg:text-5xl text-6xl">
            emerald-ui@notreal.email
          </h2>
        </div>

        <div className="flex max-md:flex-col max-lg:gap-12 gap-16">
          <div className="flex-4 shrink-0 w-2/3 max-md:w-full">
            <div className="mb-8">
              <p className="mb-12 text-zinc-500 transition-colors duration-500 dark:text-zinc-400">
                Our Spaces
              </p>
            </div>

            <div className="flex max-md:flex-col max-md:gap-12 gap-16">
              {Addresses.map((column, idx) => (
                <div key={idx} className="flex flex-1 flex-col">
                  {column.map((location) => (
                    <div key={location.city} className="mb-12 lg:mb-16">
                      <h3 className="mb-3 max-md:text-2xl font-normal text-3xl">
                        {location.city}
                      </h3>
                      {location.address.map((line, i) => (
                        <p
                          key={i}
                          className="mb-1 text-zinc-500 transition-colors duration-500 dark:text-zinc-400"
                        >
                          {line}
                        </p>
                      ))}

                      <a href="#" className="mt-8 flex items-center gap-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors dark:text-zinc-500">
                        View on map <ArrowRight className="h-4 w-4 -rotate-45" /> 
                      </a>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="flex-2 shrink-0 lg:w-1/3">
            <div className="mb-8">
              <p className="mb-12 text-zinc-500 transition-colors duration-500 dark:text-zinc-400">
                Follow Us
              </p>
            </div>
            <div className="flex flex-col gap-5">
              {SocialLinks.map(({href, title}) => (
                <a
                  href={href}
                  key={title}
                  className="cursor-pointer text-xl transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
                >
                  {title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterKeepItTouch