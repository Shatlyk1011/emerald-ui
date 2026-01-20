'use client'

import { useState } from 'react'
import { useField } from '@payloadcms/ui'

export const MediaUploadField = () => {
  const { value: mediaUrl, setValue } = useField<string>({ path: 'mediaUrl' })
  const { setValue: setType } = useField<string>({ path: 'type' })
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError(null)
    setUploadProgress(0)

    try {
      // Delete previous media if it exists
      if (mediaUrl) {
        try {
          // Determine bucket based on file extension
          const isVideo = mediaUrl.match(/\.(mp4|webm|mov|avi|mpeg)$/i)
          const bucket = isVideo ? 'videos' : 'images'

          await fetch('/api/delete-media', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: mediaUrl, bucket }),
          })

          console.log('Previous media deleted successfully')
        } catch (deleteError) {
          console.warn('Failed to delete previous media:', deleteError)
          // Continue with upload even if deletion fails
        }
      }

      const formData = new FormData()
      formData.append('file', file)

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 5, 90))
      }, 150)

      const response = await fetch('/api/upload-media', {
        method: 'POST',
        body: formData,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Upload failed')
      }

      const data = await response.json()
      setValue(data.url)

      // Auto-detect and set media type based on file type
      const isVideo = file.type.startsWith('video/') || file.name.match(/\.(mp4|webm|mov|avi|mpeg)$/i)
      setType(isVideo ? 'video' : 'image')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      console.error('Upload error:', err)
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }


  const isVideo = mediaUrl?.match(/\.(mp4|webm|mov|avi|mpeg)$/i)
  const isImage = mediaUrl && !isVideo

  return (
    <div style={{ marginTop: '1rem' }}>
      <div
        style={{
          marginBottom: '1rem',
        }}
      >
        <label
          htmlFor='media-upload'
          style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--theme-elevation-100)',
            border: '1px solid var(--theme-elevation-200)',
            borderRadius: '4px',
            cursor: uploading ? 'not-allowed' : 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: 'var(--theme-elevation-800)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            if (!uploading) {
              e.currentTarget.style.backgroundColor =
                'var(--theme-elevation-150)'
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--theme-elevation-100)'
          }}
        >
          {uploading ? 'Uploading...' : 'Choose Image or Video'}
        </label>
        <input
          id='media-upload'
          type='file'
          accept='image/*,video/*'
          onChange={handleFileChange}
          disabled={uploading}
          style={{ display: 'none' }}
        />
      </div>

      {uploading && (
        <div style={{ marginBottom: '1rem' }}>
          <div
            style={{
              width: '100%',
              height: '4px',
              backgroundColor: 'var(--theme-elevation-200)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${uploadProgress}%`,
                height: '100%',
                backgroundColor: 'var(--theme-success-500)',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
          <div
            style={{
              fontSize: '0.75rem',
              color: 'var(--theme-elevation-600)',
              marginTop: '0.25rem',
            }}
          >
            {uploadProgress}%
          </div>
        </div>
      )}

      {error && (
        <div
          style={{
            padding: '0.75rem',
            backgroundColor: 'var(--theme-error-50)',
            border: '1px solid var(--theme-error-200)',
            borderRadius: '4px',
            color: 'var(--theme-error-700)',
            fontSize: '0.875rem',
            marginBottom: '1rem',
          }}
        >
          {error}
        </div>
      )}

      {mediaUrl && (
        <div>
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
              maxWidth: '600px',
            }}
          >
            {isImage && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={mediaUrl}
                alt='Preview'
                style={{
                  maxWidth: '100%',
                  aspectRatio: '4/3',
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
            )}
            {isVideo && (
              <video
                src={mediaUrl}
                controls
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  aspectRatio: '4/3',
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
              paddingInline: "1rem",
              lineHeight: '2rem'
            }}
          >
            <span style={{ userSelect: 'none', color: 'var(--theme-elevation-600)' }}>URL:</span> {" "} <span style={{ color: 'var(--theme-elevation-750)' }}>{mediaUrl}</span>
          </div>
        </div>
      )}
    </div>
  )
}
