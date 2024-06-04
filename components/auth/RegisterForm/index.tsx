'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { FormSuccess } from '@/components/FormSuccess'
import { FormError } from '@/components/FormError'
import { Card } from '@/components/auth/Card'

import { registration } from '@/actions/registration'
import { RegisterSchema } from '@/schemas'

import classes from './RegisterForm.module.sass'

const RegisterForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = React.useState<string>('')
  const [successMessage, setSuccessMessage] = React.useState<string>('')
  const [isPending, startTransition] = React.useTransition()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  })
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setErrorMessage('')
    setSuccessMessage('')

    startTransition(() => {
      registration(values).then((data) => {
        if (data.error) setErrorMessage(data.error)
        if (data.success) setSuccessMessage(data.success)
        reset()
      })
    })
  }
  return (
    <Card
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('name')}
          placeholder="Name"
          disabled={isPending}
          className={classes.input}
        />
        <p className={classes.error}>{errors?.name?.message}</p>

        <input
          {...register('email')}
          placeholder="Email"
          disabled={isPending}
          className={classes.input}
        />
        <p className={classes.error}>{errors?.email?.message}</p>

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
          Create an account
        </button>
      </form>
    </Card>
  )
}

export { RegisterForm }
