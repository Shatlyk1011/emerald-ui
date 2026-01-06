import TemplateGrid from '@/lib/template-grid'

export default function WhatIncluded({
  templateName,
}: {
  templateName: string
}) {
  return (
    <>
      <div className='mb-4 flex items-center gap-3 pt-12'>
        <h3 className='mt-2 flex items-center gap-2 text-sm font-semibold tracking-wider text-zinc-900 uppercase dark:text-white'>
          <span>What&apos;s included</span>
        </h3>
        <div className='h-px grow bg-linear-to-r from-zinc-200 to-transparent dark:from-zinc-700' />
      </div>

      {templateName && <TemplateGrid template={templateName} />}
    </>
  )
}
