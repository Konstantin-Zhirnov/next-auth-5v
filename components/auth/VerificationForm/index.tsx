'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { BeatLoader } from 'react-spinners'

import { verification } from '@/actions/verification'
import { FormError } from '@/components/FormError'
import { FormSuccess } from '@/components/FormSuccess'
import { Card } from '@/components/auth/Card'

const VerificationForm: React.FC = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [error, setError] = React.useState('')
  const [success, setSuccess] = React.useState('')

  const onSubmit = React.useCallback(() => {
    if (error || success) return

    if (!token) {
      setError('Missing token!')
      return
    }
    verification(token)
      .then((data) => {
        if (data.error) setError(data.error)
        if (data.success) setSuccess(data.success)
      })
      .catch(() => {
        setError('Something went wrong!')
      })
  }, [token, success, error])

  React.useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <Card
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      headerLabel="Confirming your verification"
    >
      {!success && !error && <BeatLoader />}
      <FormSuccess message={success} />
      {!success && <FormError message={error} />}
    </Card>
  )
}

export { VerificationForm }
