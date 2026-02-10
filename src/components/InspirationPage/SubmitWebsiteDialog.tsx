'use client'

import { useState, FormEvent } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

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
    if (formData.email && !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
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

      toast.success("Website submitted successfully! We'll review it soon.")
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
          <DialogTitle className='font-semibold text-2xl'>
            Submit your website
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='mt-4 space-y-4'>
          <div className='space-y-2'>
            <Input
              id='name'
              type='text'
              placeholder='Name'
              autoComplete='off'
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              disabled={isSubmitting}
            />
          </div>

          <div className='space-y-2'>
            <Input
              id='email'
              type='email'
              autoComplete='off'
              placeholder='Email'
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={isSubmitting}
            />
          </div>

          <div className='space-y-2'>
            <Input
              id='websiteUrl'
              type='url'
              className='text-sm'
              autoComplete='off'
              placeholder='Website URL'
              value={formData.websiteUrl}
              onChange={(e) =>
                setFormData({ ...formData, websiteUrl: e.target.value })
              }
              disabled={isSubmitting}
              required
            />
          </div>

          <div className='space-y-2'>
            <Textarea
              id='message'
              className='max-h-40 min-h-20 text-sm placeholder:font-sans placeholder:text-sm'
              placeholder='What this website about'
              autoComplete='off'
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              disabled={isSubmitting}
              rows={4}
            />
          </div>

          <Button
            type='submit'
            disabled={isSubmitting}
            className='mt-1 w-full'
            size='sm'
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
