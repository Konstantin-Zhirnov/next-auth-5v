'use client'

import React from 'react'
import * as z from 'zod'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { Card } from '@/components/auth/Card'

import { NewPasswordSchema } from '@/schemas'
import { FormError } from '@/components/FormError'
import { FormSuccess } from '@/components/FormSuccess'
import { newPassword } from '@/actions/new-password'

import classes from './NewPasswordForm.module.sass'

const NewPasswordForm: React.FC = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [errorMessage, setErrorMessage] = React.useState<string>('')
  const [successMessage, setSuccessMessage] = React.useState<string>('')
  const [isPending, startTransition] = React.useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    },
  })
  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setErrorMessage('')
    setSuccessMessage('')

    startTransition(() => {
      newPassword(values, token).then((data) => {
        if (data?.error) setErrorMessage(data.error)
        if (data?.success) {
          setSuccessMessage(data.success)
        }
      })
    })
  }
  return (
    <Card
      headerLabel="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('password')}
          placeholder="Password"
          disabled={isPending}
          className={classes.input}
        />
        <p className={classes.error}>{errors?.password?.message}</p>

        <FormError message={errorMessage} />
        <FormSuccess message={successMessage} />

        <button type="submit" disabled={isPending} className={classes.btn}>
          Reset password
        </button>
      </form>
    </Card>
  )
}

export { NewPasswordForm }
