'use client'

import { useState } from 'react'
import { axios } from '@/lib/axios'

function NewsletterSubscribe() {
  /**
   * Send a test email to verify SMTP configuration
   */
  const sendTestEmail = async () => {
    await axios.post('/send-test-newsletter', {
      body: JSON.stringify({ to: ['penguin-99.99@Mail.ru'] }),
    })
  }
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setMessage({ type: 'error', text: 'Please enter your email address' })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          status: 'active',
          source: 'website',
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to subscribe')
      }

      setMessage({
        type: 'success',
        text: 'Successfully subscribed to our newsletter!',
      })
      setEmail('')
    } catch (error) {
      setMessage({
        type: 'error',
        text:
          error instanceof Error
            ? error.message
            : 'Failed to subscribe. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full max-w-md'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <div className='flex gap-2'>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            disabled={loading}
            className='flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white'
          />
          <button
            type='submit'
            disabled={loading}
            className='rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50'
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
          <button
            type='button'
            disabled={loading}
            onClick={sendTestEmail}
            className='rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50'
          >
            send test email
          </button>
        </div>

        {message && (
          <div
            className={`rounded-md px-4 py-2 text-sm ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400'
            }`}
          >
            {message.text}
          </div>
        )}
      </form>

      <p className='mt-2 text-xs text-gray-500 dark:text-gray-400'>
        Subscribe to receive our latest updates and news.
      </p>
    </div>
  )
}

export default NewsletterSubscribe
