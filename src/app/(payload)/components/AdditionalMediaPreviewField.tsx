'use client'

import { useState, useEffect } from 'react'
import { useDocumentInfo } from '@payloadcms/ui'

export const AdditionalMediaPreviewField = () => {
  const { data } = useDocumentInfo()
  const [mediaUrl, setMediaUrl] = useState<string | null>(null)
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { additionalMedia } = data || {}

  // Fetch media document when additionalMedia ID changes
  useEffect(() => {
    if (!additionalMedia) {
      setMediaUrl(null)
      setMediaType(null)
      return
    }

    const fetchMedia = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `/api/collections/media/${additionalMedia}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch media')
        }

        const mediaDoc = await response.json()
        setMediaUrl(mediaDoc.mediaUrl)
        setMediaType(mediaDoc.type || 'image') // Default to image if not set
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load media')
        console.error('Error fetching media:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMedia()
  }, [additionalMedia])

  if (!data || !additionalMedia) {
    return (
      <div
        style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: 'var(--theme-elevation-100)',
          border: '1px solid var(--theme-elevation-200)',
          borderRadius: '4px',
          textAlign: 'center',
          color: 'var(--theme-elevation-600)',
          fontSize: '0.875rem',
        }}
      >
        No media selected
      </div>
    )
  }

  if (loading) {
    return (
      <div
        style={{
          marginTop: '1rem',
          padding: '1.5rem',
          backgroundColor: 'var(--theme-elevation-50)',
          border: '1px solid var(--theme-elevation-200)',
          borderRadius: '4px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            width: '20px',
            height: '20px',
            border: '3px solid var(--theme-elevation-300)',
            borderTop: '3px solid var(--theme-success-500)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <div
          style={{
            marginTop: '0.75rem',
            color: 'var(--theme-elevation-700)',
            fontSize: '0.875rem',
            fontWeight: '500',
          }}
        >
          Loading media preview...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div
        style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: 'var(--theme-error-50)',
          border: '1px solid var(--theme-error-200)',
          borderRadius: '4px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: '1.5rem',
            marginBottom: '0.5rem',
          }}
        >
          ⚠️
        </div>
        <div
          style={{
            color: 'var(--theme-error-700)',
            fontSize: '0.875rem',
            fontWeight: '500',
          }}
        >
          {error}
        </div>
      </div>
    )
  }

  if (!mediaUrl) {
    return (
      <div
        style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: 'var(--theme-warning-50)',
          border: '1px solid var(--theme-warning-200)',
          borderRadius: '4px',
          textAlign: 'center',
          color: 'var(--theme-warning-700)',
          fontSize: '0.875rem',
        }}
      >
        No media URL available
      </div>
    )
  }

  // mediaType is now set from the fetched media document

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
            src={mediaUrl}
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
            src={mediaUrl}
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
          fontSize: '1.25rem',
          marginTop: '0.5rem',
          wordBreak: 'break-all',
          paddingBlock: '1rem',
          lineHeight: '2rem',
        }}
      >
        <span
          style={{ userSelect: 'none', color: 'var(--theme-elevation-600)' }}
        >
          URL:
        </span>{' '}
        <span style={{ color: 'var(--theme-elevation-750)' }}>{mediaUrl}</span>
      </div>
    </div>
  )
}
