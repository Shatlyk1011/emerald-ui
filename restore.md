1) pages pricing, inspiration-page
2) remove redirects
3) main page content 
<!-- <main className='items-top mx-auto mb-16 flex h-full min-h-[200vh] w-full max-w-5xl justify-center overflow-x-hidden px-12 pt-30 max-lg:px-8 max-sm:px-4 max-sm:pt-2'>
  <section className='flex w-full flex-col items-center gap-8'>
    <div className='text-center'>
      <h1 className='-tracking-two mb-2 text-4xl font-semibold'>
        Build something great
      </h1>
      <p className='text-primary/70 -tracking-two font-mono text-base'>
        Create apps and websites by chatting with AI
      </p>
    </div>
    <FileUploadInput />
    {/* <DesignGenerationApp /> */}
  </section>
  <div className='absolute top-0 left-0 -z-1 h-svh w-full'>
    <BackgroundThreads />
  </div>
</main> -->

4) regenerate dialog button 
<!-- <Button
  className='w-full'
  onClick={() => {
    // TODO: Implement regenerate functionality
    console.log('Regenerate website:', selectedSite.title)
  }}
>
  <span className='relative z-10 flex items-center justify-center gap-2'>
    <Sparkles className='h-4 w-4' />
    Regenerate This Template
  </span>
</Button> -->

5) layout header links

6) profile page - invoices
<!--const mockInvoices = [
  {
    id: 1,
    date: '2026-01-15',
    amount: 0,
    status: 'Paid',
    description: 'Free Plan - January 2026',
  },
  {
    id: 2,
    date: '2025-12-15',
    amount: 0,
    status: 'Paid',
    description: 'Free Plan - December 2025',
  },
  {
    id: 3,
    date: '2025-11-15',
    amount: 0,
    status: 'Paid',
    description: 'Free Plan - November 2025',
  },
] -->

<!-- {/* Invoice History */} -->
<!-- <div className='bg-card/20 mb-6 rounded-xl border p-8 shadow-sm'>
  <h2 className='mb-6 text-xl font-semibold'>Invoice History</h2>

  <div className='overflow-hidden rounded-lg border'>
    <Table className='w-full'>
      <TableHeader className='bg-muted/50'>
        <TableRow>
          <TableHead className='px-6 py-3 text-left text-sm font-medium'>
            Date
          </TableHead>
          <TableHead className='px-6 py-3 text-left text-sm font-medium'>
            Description
          </TableHead>
          <TableHead className='px-6 py-3 text-left text-sm font-medium'>
            Status
          </TableHead>
          <TableHead className='px-6 py-3 text-right text-sm font-medium'>
            Amount
          </TableHead>
          <TableHead className='px-6 py-3 text-right text-sm font-medium'>
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className='divide-y'>
        {mockInvoices?.map((invoice) => (
          <TableRow
            key={invoice.id}
            className='hover:bg-muted/30 transition-colors'
          >
            <TableCell className='px-6 py-4 text-sm'>
              <div className='flex items-center gap-2'>
                <Calendar className='text-muted-foreground size-4' />
                {formatDate(invoice.date)}
              </div>
            </TableCell>
            <TableCell className='px-6 py-4 text-sm'>
              {invoice.description}
            </TableCell>
            <TableCell className='px-6 py-4 text-sm'>
              <span className='inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400'>
                {invoice.status}
              </span>
            </TableCell>
            <TableCell className='px-6 py-4 text-right text-sm font-semibold'>
              ${invoice.amount.toFixed(2)}
            </TableCell>
            <TableCell className='px-6 py-4 text-right'>
              <Button
                variant='ghost'
                size='sm'
                className='text-blue-600 hover:text-blue-700'
              >
                <CreditCard className='mr-2 size-4' />
                Download
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    {!mockInvoices.length && (
      <div className='py-2 text-center'>
        <Button
          variant='link'
          size='sm'
          asChild
          className='text-blue-500 hover:text-blue-600'
        >
          <Link href='/pricing'>
            Upgrade your plan to receive invoices.
          </Link>
        </Button>
      </div>
    )}
  </div>
</div> -->