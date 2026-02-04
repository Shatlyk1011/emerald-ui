'use client'

import { useState } from 'react'
import { useField } from '@payloadcms/ui'

export const FaviconPreviewField = () => {
  const { value: favicon, setValue } = useField<string>({ path: 'favicon' })
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    if (!favicon || !confirm('Are you sure you want to delete this favicon?')) {
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
        body: JSON.stringify({ url: favicon, bucket: 'favicons' }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Delete failed')
      }

      // Clear the field value
      setValue(null)
      console.log('Favicon deleted successfully')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed')
      console.error('Delete error:', err)
    } finally {
      setDeleting(false)
    }
  }

  if (!favicon) {
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span>Preview:</span>
        <button
          type='button'
          onClick={handleDelete}
          disabled={deleting}
          style={{
            padding: '0.375rem 0.75rem',
            fontSize: '0.75rem',
            fontWeight: '500',
            color: deleting
              ? 'var(--theme-elevation-400)'
              : 'var(--theme-error-600)',
            backgroundColor: deleting
              ? 'var(--theme-elevation-100)'
              : 'var(--theme-error-50)',
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
          {deleting ? 'Deleting...' : 'Delete Favicon'}
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
          maxWidth: '64px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={favicon}
          alt='favicon preview'
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
