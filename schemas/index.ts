import * as z from 'zod'
import { UserRole } from '@prisma/client'

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string()),
    newPassword: z.optional(z.string()),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false
      }

      return true
    },
    {
      message: 'New password is required!',
      path: ['newPassword'],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false
      }

      return true
    },
    {
      message: 'Password is required!',
      path: ['password'],
    },
  )

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: 'Minimum 6 characters required' }),
})

export const ResetSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
})

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string({ required_error: 'Please enter your password' })
    .min(6, { message: 'Minimum 6 characters required' }),
  code: z.optional(z.string()),
})

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: 'Please enter your name' }),
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Please enter a valid email address' }),
  password: z
    .string({ required_error: 'Please enter your password' })
    .min(6, { message: 'Minimum 6 characters required' }),
})
