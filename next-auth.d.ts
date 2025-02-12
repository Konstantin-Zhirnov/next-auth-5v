import { UserRole } from '@prisma/client'
import { DefaultSession } from 'next-auth'

type ExtendedUser = DefaultSession['user'] & {
  role: UserRole
  isTwoFactorEnabled: boolean
  isOAuth: boolean
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    role?: 'ADMIN' | 'USER'
  }
}
