import { z } from 'zod'

/**
 * Zod schema for email validation in login form
 */
export const loginSchema = z.object({
  email: z.email('Email is required'),
})

export type LoginFormData = z.infer<typeof loginSchema>
