'use client'

import { useField } from '@payloadcms/ui'

export const FaviconPreviewField = () => {
  const { value } = useField<string>({ path: 'favicon' })

  if (!value) {
    return null
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      <div
        style={{
          fontSize: '1rem',
          fontWeight: '600',
          marginBottom: '0.5rem',
          color: 'var(--theme-elevation-800)',
        }}
      >
        Preview:
      </div>
      <div
        style={{
          border: '1px solid var(--theme-elevation-200)',
          borderRadius: '4px',
          padding: '0.5rem',
          backgroundColor: 'var(--theme-elevation-50)',
          maxWidth: '64px',
          cursor: 'default',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={value}
          alt={`favicon preview`}
          style={{
            maxWidth: '100%',
            height: 'auto',
            display: 'block',
            borderRadius: '2px',
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
            const parent = target.parentElement
            if (parent) {
              const errorDiv = document.createElement('div')
              errorDiv.style.cssText =
                'color: var(--theme-error-500); font-size: 0.75rem; padding: 0.5rem; text-align: center;'
              errorDiv.textContent = 'Failed to load'
              parent.appendChild(errorDiv)
            }
          }}
        />
      </div>
    </div>
  )
}
