'use client'

import { useDocumentInfo } from '@payloadcms/ui'

export const AdditionalMediaPreviewField = () => {
  const { data } = useDocumentInfo()

  console.log('xxx', data)
  if(!data) {
    return <span>No media preview available</span>
  }
  
  const {additionalMedia, additionalMediaType} = data
  if(!additionalMedia && !additionalMediaType) {
    return <span>No url or type selected</span>
  }

  const mediaType: 'image' | "video" = additionalMediaType

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
        Additional Media Preview:
      </div>
      <div
        style={{
          border: '1px solid var(--theme-elevation-200)',
          borderRadius: '4px',
          padding: '0.5rem',
          backgroundColor: 'var(--theme-elevation-50)',
          maxWidth: '600px',
        }}
      >
        {mediaType === 'image' ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={additionalMedia}
            alt={'Additional media preview'}
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
        ) : (
          <video
            src={additionalMedia}
            controls
            style={{
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: '4px',
            }}
            onError={(e) => {
              const target = e.target as HTMLVideoElement
              target.style.display = 'none'
              const parent = target.parentElement
              if (parent) {
                const errorDiv = document.createElement('div')
                errorDiv.style.cssText =
                  'color: var(--theme-error-500); font-size: 0.875rem; padding: 1rem; text-align: center;'
                errorDiv.textContent = 'Failed to load video'
                parent.appendChild(errorDiv)
              }
            }}
          />
        )}

      </div>
      <div
        style={{
          fontSize: '0.75rem',
          color: 'var(--theme-elevation-600)',
          marginTop: '0.5rem',
          wordBreak: 'break-all',
        }}
      >
        URL: {additionalMedia}
      </div>
      {data.description && (
        <div
          style={{
            fontSize: '0.875rem',
            color: 'var(--theme-elevation-700)',
            marginTop: '0.5rem',
            fontStyle: 'italic',
          }}
        >
          {data.description}
        </div>
      )}
    </div>
  )
}
