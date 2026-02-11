'use client'

import { useState } from 'react'
import { useField } from '@payloadcms/ui'

const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export const MediaUploadField = () => {
  const { value: mediaUrl, setValue: setMediaUrl } = useField<string>({
    path: 'mediaUrl',
  })
  const { setValue: setType } = useField<string>({ path: 'type' })
  const { value: size, setValue: setSize } = useField<number>({ path: 'size' }) // Track size field
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(false) // Track deletion state
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file')
  const [urlInput, setUrlInput] = useState('')

  const handleDelete = async () => {
    if (!mediaUrl) return

    if (!confirm('Are you sure you want to delete this media? This cannot be undone.')) {
      return
    }

    setDeleting(true)
    setError(null)

    try {
      // Determine bucket based on file extension
      const isVideo = mediaUrl.match(/\.(mp4|webm|mov|avi|mpeg)$/i)
      const bucket = isVideo ? 'videos' : 'images'

      const response = await fetch('/api/delete-media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: mediaUrl, bucket }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Delete failed')
      }

      console.log('Media deleted successfully')

      // Clear fields
      setMediaUrl('')
      setType('')
      setSize(0) // Reset size
    } catch (err) {
      console.error('Delete error:', err)
      setError(err instanceof Error ? err.message : 'Delete failed')
    } finally {
      setDeleting(false)
    }
  }

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
      setMediaUrl(data.url)
      setType(data.mediaType)
      if (data.size) {
        setSize(data.size) // Set size from response
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      console.error('Upload error:', err)
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const handleUrlUpload = async () => {
    if (!urlInput.trim()) {
      setError('Please enter a valid URL')
      return
    }

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

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 5, 90))
      }, 150)

      const response = await fetch('/api/upload-media-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: urlInput.trim() }),
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Upload failed')
      }

      const data = await response.json()
      setMediaUrl(data.url)
      setType(data.mediaType)
      if (data.size) {
        setSize(data.size) // Set size from response
      }
      setUrlInput('') // Clear input after successful upload
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      console.error('URL upload error:', err)
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const isVideo = mediaUrl?.match(/\.(mp4|webm|mov|avi|mpeg)$/i)
  const isImage = mediaUrl && !isVideo

  return (
    <div style={{ marginTop: '1rem' }}>
      {/* Upload Mode Toggle */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1rem',
          borderBottom: '1px solid var(--theme-elevation-200)',
        }}
      >
        <button
          type="button"
          onClick={() => setUploadMode('file')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom:
              uploadMode === 'file'
                ? '2px solid var(--theme-success-500)'
                : '2px solid transparent',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: uploadMode === 'file' ? '600' : '500',
            color:
              uploadMode === 'file'
                ? 'var(--theme-elevation-900)'
                : 'var(--theme-elevation-600)',
            transition: 'all 0.2s',
          }}
        >
          Upload File
        </button>
        <button
          type="button"
          onClick={() => setUploadMode('url')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom:
              uploadMode === 'url'
                ? '2px solid var(--theme-success-500)'
                : '2px solid transparent',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: uploadMode === 'url' ? '600' : '500',
            color:
              uploadMode === 'url'
                ? 'var(--theme-elevation-900)'
                : 'var(--theme-elevation-600)',
            transition: 'all 0.2s',
          }}
        >
          From URL
        </button>
      </div>

      {/* File Upload Mode */}
      {uploadMode === 'file' && (
        <div
          style={{
            marginBottom: '1rem',
          }}
        >
          <label
            htmlFor="media-upload"
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
            id="media-upload"
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            disabled={uploading}
            style={{ display: 'none' }}
          />
        </div>
      )}

      {/* URL Upload Mode */}
      {uploadMode === 'url' && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Enter media URL (image or video)"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              disabled={uploading}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !uploading) {
                  e.preventDefault()
                  handleUrlUpload()
                }
              }}
              style={{
                flex: 1,
                padding: '0.5rem',
                border: '1px solid var(--theme-elevation-200)',
                borderRadius: '4px',
                fontSize: '0.875rem',
                backgroundColor: 'var(--theme-elevation-50)',
                color: 'var(--theme-elevation-900)',
              }}
            />
            <button
              type="button"
              onClick={handleUrlUpload}
              disabled={uploading || !urlInput.trim()}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: uploading
                  ? 'var(--theme-elevation-200)'
                  : 'var(--theme-success-500)',
                border: 'none',
                borderRadius: '4px',
                cursor:
                  uploading || !urlInput.trim() ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'white',
                transition: 'all 0.2s',
                opacity: uploading || !urlInput.trim() ? 0.6 : 1,
              }}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>
      )}

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
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem',
            }}
          >
            <div
              style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: 'var(--theme-elevation-800)',
              }}
            >
              Preview:
            </div>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              style={{
                padding: '0.25rem 0.75rem',
                backgroundColor: 'var(--theme-error-500)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: '500',
                cursor: deleting ? 'not-allowed' : 'pointer',
                opacity: deleting ? 0.6 : 1,
                transition: 'all 0.2s',
              }}
            >
              {deleting ? 'Deleting...' : 'Remove Media'}
            </button>
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
              fontSize: '0.875rem',
              marginTop: '0.5rem',
              wordBreak: 'break-all',
              paddingBlock: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
            }}
          >
            <div>
              <span
                style={{
                  userSelect: 'none',
                  color: 'var(--theme-elevation-600)',
                  fontWeight: '500',
                }}
              >
                URL:
              </span>{' '}
              <a
                href={mediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--theme-primary-500)',
                  textDecoration: 'none',
                }}
              >
                {mediaUrl}
              </a>
            </div>
            {size ? (
              <div>
                <span
                  style={{
                    userSelect: 'none',
                    color: 'var(--theme-elevation-600)',
                    fontWeight: '500',
                  }}
                >
                  Size:
                </span>{' '}
                <span style={{ color: 'var(--theme-elevation-750)' }}>
                  {formatBytes(size)}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}

