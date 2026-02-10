'use client'

import { useDocumentInfo } from '@payloadcms/ui'
import { useState } from 'react'

export const SendNewsletterButton = () => {
  const { data } = useDocumentInfo()
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSend = async () => {
    if (!data?.id) {
      setError('Newsletter ID not found')
      return
    }

    // Confirm before sending
    const confirmed = confirm(
      `Are you sure you want to send this newsletter to all active subscribers?`
    )

    if (!confirmed) return

    setSending(true)
    setError(null)
    setMessage(null)

    try {
      const response = await fetch('/api/send-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newsletterId: data.id }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send newsletter')
      }

      setMessage(result.message || 'Newsletter sent successfully!')
      
      // Reload the page to show updated status
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send newsletter')
      console.error('Send newsletter error:', err)
    } finally {
      setSending(false)
    }
  }

  const isSent = data?.status === 'sent'
  const recipientCount = data?.recipientCount || 0

  return (
    <div
      style={{
        padding: '1rem',
        backgroundColor: 'var(--theme-elevation-100)',
        borderRadius: '4px',
        marginBottom: '1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <div>
          <h3
            style={{
              margin: '0 0 0.5rem 0',
              fontSize: '1rem',
              fontWeight: '600',
            }}
          >
            Newsletter Actions
          </h3>
          {isSent ? (
            <p
              style={{
                margin: 0,
                fontSize: '0.875rem',
                color: 'var(--theme-success-500)',
              }}
            >
              ✓ Sent to {recipientCount} subscriber{recipientCount !== 1 ? 's' : ''} on{' '}
              {data?.sentDate
                ? new Date(data.sentDate).toLocaleString()
                : 'unknown date'}
            </p>
          ) : (
            <p
              style={{
                margin: 0,
                fontSize: '0.875rem',
                color: 'var(--theme-elevation-600)',
              }}
            >
              This newsletter has not been sent yet.
            </p>
          )}
        </div>

        <button
          onClick={handleSend}
          disabled={sending || isSent}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: isSent
              ? 'var(--theme-elevation-300)'
              : 'var(--theme-success-500)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: isSent ? 'not-allowed' : sending ? 'wait' : 'pointer',
            opacity: isSent ? 0.5 : 1,
            transition: 'all 0.2s ease',
          }}
        >
          {sending ? 'Sending...' : isSent ? 'Already Sent' : 'Send Newsletter'}
        </button>
      </div>

      {message && (
        <div
          style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: 'var(--theme-success-50)',
            border: '1px solid var(--theme-success-200)',
            borderRadius: '4px',
            color: 'var(--theme-success-700)',
            fontSize: '0.875rem',
          }}
        >
          {message}
        </div>
      )}

      {error && (
        <div
          style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: 'var(--theme-error-50)',
            border: '1px solid var(--theme-error-200)',
            borderRadius: '4px',
            color: 'var(--theme-error-700)',
            fontSize: '0.875rem',
          }}
        >
          {error}
        </div>
      )}
    </div>
  )
}
