'use client'

import { useDocumentInfo } from '@payloadcms/ui'

export const ImagePreviewField = () => {
  const { data } = useDocumentInfo()
  

  if(!data) {
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
          maxWidth: '400px',
          cursor: 'pointer',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.imgUrl}
          alt="Preview"
          style={{
            maxWidth: '100%',
            height: 'auto',
            display: 'block',
            borderRadius: '4px',
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
            const parent = target.parentElement
            if (parent) {
              const errorDiv = document.createElement('div')
              errorDiv.style.cssText =
                'color: var(--theme-error-500); font-size: 0.875rem; padding: 1rem; text-align: center;'
              errorDiv.textContent = 'Failed to load image'
              parent.appendChild(errorDiv)
            }
          }}
        />
      </div>
    </div>
  )
}
