'use client'

import React from 'react'
import { UserRole } from '@prisma/client'

import { useCurrentRole } from '@/hooks/useCurrentRole'
import { FormError } from '@/components/FormError'

interface IProps {
  children: React.ReactNode
  allowedRole: UserRole
}
const RoleGate: React.FC<IProps> = ({ children, allowedRole }) => {
  const role = useCurrentRole()

  if (role !== allowedRole) {
    return <FormError message="You do not have permission to view this content!" />
  }

  return <>{children}</>
}

export { RoleGate }
