import { cn } from '@/lib/utils';
import { CircleCheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DEMO = [
  {
    plan: "Starter",
    role: "For Individuals",
    tier: { title: "$9", subtitle: "/month" },
    list_1: [
      "Up to 5 projects",
      "10 GB storage",
      "Basic analytics",
      "Email support"
    ],
    list_2: [
      "Community access",
      "Basic templates",
      "Mobile app access"
    ],
    list_2_heading: "Additional Features",
    button_text: "Start Free Trial",
    button_classes: "bg-zinc-800 hover:bg-zinc-900 dark:bg-zinc-300 dark:text-zinc-900 bg- dark:hover:bg-zinc-400",
  },
  {
    plan: "Professional",
    role: "Most Popular",
    tier: { title: "$29", subtitle: "/month" },
    list_1: [
      "Unlimited projects",
      "100 GB storage",
      "Advanced analytics",
      "Priority email support"
    ],
    list_2: [
      "Team collaboration",
      "Custom integrations",
      "API access",
      "Premium templates"
    ],
    list_2_heading: "Everything in Starter, plus:",
    button_text: "Get Started",
    button_classes: "bg-zinc-800 hover:bg-zinc-900 dark:bg-zinc-300 dark:text-zinc-900 bg- dark:hover:bg-zinc-400",
  },
]

interface IPricingCard {
  plan: string
  role: string
  tier: { title: string; subtitle?: string }
  list_1: string[]
  list_2_heading?: string
  list_2: string[]
  button_text: string
  button_classes?: string
}

interface Props {
  item: IPricingCard
}

// Pricing Card 
function PricingCard({item}: Props) {
  const { plan, role, tier, list_1, list_2_heading, list_2, button_text, button_classes, } = item
  return (
    <div className="flex flex-1 max-w-105 w-full flex-col rounded-3xl border border-solid border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-8 pb-13 leading-[0] max-lg:rounded-3xl max-lg:p-6 max-lg:pb-8 max-md:max-w-full max-md:rounded-2xl max-md:p-5 max-md:pb-10">
      <div className="flex items-center justify-between gap-3 max-lg:flex-col max-md:flex-row">
        <h2 className="text-[26px] leading-[110%] font-medium tracking-[-0.03em] text-zinc-900 dark:text-zinc-100 max-lg:text-2xl max-md:text-[20px]">
          {plan}
        </h2>
        <span className="rounded-lg text-nowrap bg-blue-100 dark:bg-blue-950 opacity-90 px-5 py-2.5 text-base leading-[130%] font-bold max-lg:px-4 max-lg:py-1.5 max-lg:text-sm">
          {role}
        </span>
      </div>

      <div className="mt-7.5 flex items-end gap-2 max-lg:mt-3">
        <h3 className="text-[40px] leading-[110%] font-medium tracking-[-0.03em] text-zinc-900 dark:text-zinc-100 max-lg:text-[32px] max-md:text-[44px]">
          {tier.title}
        </h3>
        {tier.subtitle && (
          <span className="mb-0.5 inline-block text-xl leading-[130%] text-zinc-600 dark:text-zinc-400 max-lg:text-sm max-md:text-[17px]">
            {tier.subtitle}
          </span>
        )}
      </div>

      <div className="my-11 px-0 text-lg max-lg:mt-5 max-lg:mb-8 max-lg:text-sm max-md:my-6 max-md:text-[15px]">
        <ul className="flex min-h-16 flex-col justify-center gap-4 leading-[130%] font-medium text-zinc-600 dark:text-zinc-300 max-lg:min-h-12 max-lg:gap-2">
          {list_1.map((text) => (
            <li key={text} className="flex items-center gap-2.5">
              <div className="max-h-6 min-h-6 max-w-6 min-w-6 leading-0 max-lg:max-h-5 max-lg:min-h-5 max-lg:max-w-5 max-lg:min-w-5">
                <CircleCheckIcon className="h-full w-full text-blue-600 dark:text-blue-400" />
              </div>
              <span className="max-w-[80%]">{text}</span>
            </li>
          ))}
        </ul>

        <div className="bg-gray-200 dark:bg-zinc-700 my-6 h-px w-full max-lg:my-4"></div>

        <ul className="flex min-h-16 flex-col justify-center gap-4 leading-[130%] font-medium text-zinc-600 dark:text-zinc-300 max-lg:gap-2">
          {list_2_heading && <h4 className="font-[inherit]">{list_2_heading}</h4>}
          {list_2.map((text) => (
            <li key={text} className="flex items-center gap-2.5">
              <div className="max-h-6 min-h-6 max-w-6 min-w-6 leading-0 max-lg:max-h-5 max-lg:min-h-5 max-lg:max-w-5 max-lg:min-w-5">
                <CircleCheckIcon className="h-full w-full text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="max-w-[80%]">{text}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        className={cn(
          "relative mt-auto items-center inline-flex h-14 bg-red-500 w-full rounded-full transition text-white text-base font-bold text-nowrap p-4 text-center leading-0 max-lg:h-12",
          button_classes,
        )}
      >
        {button_text}
      </Button>
    </div>
  )
}

// Demo Section
export default function SimplePricingCardSection () {
  return (
    <div className="flex flex-col w-full justify-center gap-3 max-lg:gap-2 max-md:flex-col max-md:gap-3">
      <div className='mb-8 text-center'>
        <h1 className='mb-2 text-4xl font-bold tracking-tight max-sm:text-3xl'>
          Simple, Pricing Card
        </h1>
        <p className='text-muted-foreground mx-auto max-w-2xl text-lg max-sm:text-base'>
          Explore our free resources, or get started with a paid plan.
        </p>
      </div>
      <section className='flex w-full justify-center gap-3 max-lg:gap-2 max-md:flex-col max-md:gap-3'>

        {DEMO.map((item) => (
          <PricingCard key={item.plan} item={item} />
        ))}
      </section>
    </div>

  )
}