'use client'

import { useState, FormEvent } from 'react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface SubmitWebsiteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SubmitWebsiteDialog({
  open,
  onOpenChange,
}: SubmitWebsiteDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    websiteUrl: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Client-side validation
    if (!formData.websiteUrl.trim()) {
      toast.error('Website URL is required')
      return
    }

    // Validate URL format
    try {
      new URL(formData.websiteUrl)
    } catch {
      toast.error('Please enter a valid URL')
      return
    }

    // Validate email format if provided
    if (
      formData.email &&
      !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    ) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/submit-website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Submission failed')
      }

      toast.success('Website submitted successfully! We\'ll review it soon.')
      onOpenChange(false)
      setFormData({ name: '', email: '', websiteUrl: '', message: '' })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to submit')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-semibold'>
            Submit a Website
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4 mt-4'>
          <div className='space-y-2'>
            <label htmlFor='name' className='text-sm font-medium inline-block'>
              Name
            </label>
            <Input
              id='name'
              type='text'
              placeholder='Your name'
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              disabled={isSubmitting}
            />
          </div>

          <div className='space-y-2'>
            <label htmlFor='email' className='text-sm font-medium inline-block'>
              Email
            </label>
            <Input
              id='email'
              type='email'
              placeholder='your@email.com'
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={isSubmitting}
            />
          </div>

          <div className='space-y-2'>
            <label htmlFor='websiteUrl' className='text-sm font-medium inline-block'>
              Website URL <span className='text-destructive'>*</span>
            </label>
            <Input
              id='websiteUrl'
              type='url'
              placeholder='https://example.com'
              value={formData.websiteUrl}
              onChange={(e) =>
                setFormData({ ...formData, websiteUrl: e.target.value })
              }
              disabled={isSubmitting}
              required
            />
          </div>

          <div className='space-y-2'>
            <label htmlFor='message' className='text-sm font-medium inline-block'>
              Message
            </label>
            <Textarea
              id='message'
              placeholder='Tell us why this website is inspiring...'
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              disabled={isSubmitting}
              rows={4}
            />
          </div>

          <div className='flex gap-3 pt-4'>
            <Button
              type='button'
              variant='secondary'
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className='flex-1'
            >
              Cancel
            </Button>
            <Button type='submit' disabled={isSubmitting} className='flex-1'>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
