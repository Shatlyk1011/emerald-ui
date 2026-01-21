'use client'

import { useState } from 'react'
import { useField } from '@payloadcms/ui'

export const ImagePreviewField = () => {
  const { value, setValue } = useField<string>({ path: 'imgUrl' })
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError(null)
    setUploadProgress(0)

    try {
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

      // Update the imgUrl field with the uploaded image URL
      setValue(data.url)
      console.log('Image uploaded successfully:', data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      console.error('Upload error:', err)
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const handleDelete = async () => {
    if (!value || !confirm('Are you sure you want to delete this image?')) {
      return
    }

    setDeleting(true)
    setError(null)

    try {
      const response = await fetch('/api/delete-media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: value, bucket: 'images' }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Delete failed')
      }

      // Clear the field value
      setValue(null)
      console.log('Image deleted successfully')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed')
      console.error('Delete error:', err)
    } finally {
      setDeleting(false)
    }
  }

  // Show upload UI when no image exists
  if (!value) {
    return (
      <div style={{ marginTop: '1rem' }}>
        <div
          style={{
            marginBottom: '1rem',
          }}
        >
          <label
            htmlFor="image-upload"
            style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              backgroundColor: uploading
                ? 'var(--theme-elevation-100)'
                : 'var(--theme-success-100)',
              border: `1px solid ${uploading ? 'var(--theme-elevation-200)' : 'var(--theme-success-300)'}`,
              borderRadius: '4px',
              cursor: uploading ? 'not-allowed' : 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: uploading
                ? 'var(--theme-elevation-600)'
                : 'var(--theme-success-700)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!uploading) {
                e.currentTarget.style.backgroundColor = 'var(--theme-success-200)'
              }
            }}
            onMouseLeave={(e) => {
              if (!uploading) {
                e.currentTarget.style.backgroundColor = 'var(--theme-success-100)'
              }
            }}
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
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
                maxWidth: '400px',
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
              maxWidth: '400px',
            }}
          >
            {error}
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      <div
        style={{
          fontSize: '1rem',
          fontWeight: '600',
          marginBottom: '0.5rem',
          color: 'var(--theme-elevation-800)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span>Preview:</span>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          style={{
            padding: '0.375rem 0.75rem',
            fontSize: '0.75rem',
            fontWeight: '500',
            color: deleting ? 'var(--theme-elevation-400)' : 'var(--theme-error-600)',
            backgroundColor: deleting ? 'var(--theme-elevation-100)' : 'var(--theme-error-50)',
            border: `1px solid ${deleting ? 'var(--theme-elevation-200)' : 'var(--theme-error-200)'}`,
            borderRadius: '4px',
            cursor: deleting ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            if (!deleting) {
              e.currentTarget.style.backgroundColor = 'var(--theme-error-100)'
            }
          }}
          onMouseLeave={(e) => {
            if (!deleting) {
              e.currentTarget.style.backgroundColor = 'var(--theme-error-50)'
            }
          }}
        >
          {deleting ? 'Deleting...' : 'Delete Image'}
        </button>
      </div>

      {error && (
        <div
          style={{
            padding: '0.5rem',
            backgroundColor: 'var(--theme-error-50)',
            border: '1px solid var(--theme-error-200)',
            borderRadius: '4px',
            color: 'var(--theme-error-700)',
            fontSize: '0.75rem',
            marginBottom: '0.5rem',
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          border: '1px solid var(--theme-elevation-200)',
          borderRadius: '4px',
          padding: '0.5rem',
          backgroundColor: 'var(--theme-elevation-50)',
          maxWidth: '400px',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={value}
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
