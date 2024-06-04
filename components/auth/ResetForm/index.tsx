'use client'

import React from 'react'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { ResetSchema } from '@/schemas'
import { reset } from '@/actions/reset'

import { Card } from '@/components/auth/Card'
import { FormError } from '@/components/FormError'
import { FormSuccess } from '@/components/FormSuccess'

import classes from './ResetForm.module.sass'

const ResetForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = React.useState<string>('')
  const [successMessage, setSuccessMessage] = React.useState<string>('')
  const [isPending, startTransition] = React.useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  })
  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setErrorMessage('')
    setSuccessMessage('')

    startTransition(() => {
      reset(values).then((data) => {
        if (data?.error) setErrorMessage(data.error)
        if (data?.success) {
          setSuccessMessage(data.success)
        }
      })
    })
  }
  return (
    <Card
      headerLabel="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('email')}
          placeholder="Email"
          disabled={isPending}
          className={classes.input}
        />
        <p className={classes.error}>{errors?.email?.message}</p>

        <FormError message={errorMessage} />
        <FormSuccess message={successMessage} />

        <button type="submit" disabled={isPending} className={classes.btn}>
          Send reset email
        </button>
      </form>
    </Card>
  )
}

export { ResetForm }
