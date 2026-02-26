import { ArrowRight, Headphones, ShoppingBag, Truck } from 'lucide-react'

export default function CheckoutCard() {
  const items = [
    { label: 'Subtotal', value: '$349.00' },
    { label: 'Tax', value: '$34.90' },
    { label: 'Shipping', value: 'Free' },
  ]
  return (
    <div className='group relative w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900'>
      <div className='border-b border-zinc-200 p-4 dark:border-zinc-800'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-900/20'>
              <ShoppingBag className='h-5 w-5 text-orange-600 dark:text-orange-400' />
            </div>
            <div>
              <h3 className='text-lg font-semibold text-zinc-900 dark:text-zinc-100'>
                Order Summary
              </h3>
              <p className='text-sm text-zinc-500 dark:text-zinc-400'>
                Review your items
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='border-b border-zinc-200 p-4 dark:border-zinc-800'>
        <div className='flex gap-4'>
          <div className='flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800/50'>
            <Headphones className='h-8 w-8 text-zinc-500 dark:text-zinc-400' />
          </div>
          <div className='flex-1'>
            <h4 className='text-lg font-semibold text-zinc-900 dark:text-zinc-100'>
              Studio Pro Wireless
            </h4>
            <p className='mt-1 text-sm text-zinc-500 dark:text-zinc-400'>
              Noise-cancelling, 40h battery
            </p>
            <div className='mt-3 flex items-center gap-4'>
              <div className='flex min-w-25 items-center gap-2'>
                <span className='text-sm text-zinc-600 dark:text-zinc-300'>
                  Matte Black
                </span>
              </div>
              <div className='min-w-15 text-sm text-zinc-600 dark:text-zinc-300'>
                Qty: 1
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='border-b border-zinc-200 p-4 dark:border-zinc-800'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/20'>
              <Truck className='h-4 w-4 text-blue-600 dark:text-blue-400' />
            </div>
            <div>
              <p className='text-sm font-medium text-zinc-900 dark:text-zinc-100'>
                Standard Shipping
              </p>
              <p className='text-xs text-zinc-500 dark:text-zinc-400'>
                Arrives Tue, Oct 24
              </p>
            </div>
          </div>
          <div className='text-sm font-medium text-emerald-600 dark:text-emerald-400'>
            In Stock
          </div>
        </div>
      </div>
      <div className='space-y-4 p-4'>
        <div className='space-y-2 py-3'>
          {items.map((item) => (
            <div key={item.label} className='flex justify-between text-sm'>
              <span className='text-zinc-600 dark:text-zinc-400'>
                {item.label}
              </span>
              <span className='text-zinc-900 dark:text-zinc-100'>
                {item.value}
              </span>
            </div>
          ))}
          {/* total */}
          <div className='flex justify-between border-t border-zinc-200 pt-2 font-medium dark:border-zinc-800'>
            <span className='text-zinc-900 dark:text-zinc-100'>Total</span>
            <span className='text-zinc-900 dark:text-zinc-100'>$383.90</span>
          </div>
        </div>
        <button
          type='button'
          className='group relative flex h-11 w-full items-center justify-center rounded-xl bg-zinc-900 text-sm font-medium text-white transition-all duration-300 hover:opacity-90 dark:bg-zinc-100 dark:text-zinc-900'
        >
          <span className='flex items-center gap-2'>
            Confirm Order
            <ArrowRight className='h-5 w-5 transition-transform group-hover:translate-x-1' />
          </span>
        </button>
        <p className='text-center text-xs text-zinc-500 dark:text-zinc-400'>
          Payments are secured and encrypted
        </p>
      </div>
    </div>
  )
}
