'use client'

import { useState, FormEvent } from 'react'
import { DialogDescription } from '@radix-ui/react-dialog'
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

interface SubmitIssueDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const FormInitial = {
  name: '',
  email: '',
  message: '',
}

export default function SubmitIssueDialog({
  open,
  onOpenChange,
}: SubmitIssueDialogProps) {
  const [formData, setFormData] = useState(FormInitial)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Client-side validation
    if (!formData.message.trim()) {
      toast.error('Message is required')
      return
    }

    // Validate email format if provided
    if (formData.email && !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/submit-issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Submission failed')
      }

      toast.success('Issue submitted successfully. Thank you!', {
        position: 'top-center',
      })
      onOpenChange(false)
      setFormData(FormInitial)
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to submit. Try again later :<'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-md'>
        <DialogHeader className='gap-1'>
          <DialogTitle className='text-2xl font-semibold'>
            Find an issue?
          </DialogTitle>
          <DialogDescription className='text-sm opacity-70'>
            Please, describe the problem you found or feedback you have.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          autoComplete='off'
          className='mt-4 flex flex-col gap-4'
        >
          <Input
            id='email'
            type='email'
            autoComplete='off'
            className='text-sm placeholder:font-sans placeholder:text-sm'
            placeholder='Email (Optional)'
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            disabled={isSubmitting}
          />

          <Textarea
            id='message'
            className='max-h-60 min-h-40 text-sm placeholder:font-sans placeholder:text-sm'
            placeholder='Describe the issue or feedback...'
            autoComplete='off'
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            disabled={isSubmitting}
            rows={4}
            required
          />

          <Button
            type='submit'
            disabled={isSubmitting}
            className='mt-1 w-full'
            size='sm'
          >
            {isSubmitting ? 'Submitting...' : 'Submit Issue'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
