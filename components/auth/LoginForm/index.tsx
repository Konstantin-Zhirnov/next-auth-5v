'use client'

import React from 'react'
import Link from 'next/link'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { LoginSchema } from '@/schemas'
import { login } from '@/actions/login'

import { Card } from '@/components/auth/Card'
import { FormError } from '@/components/FormError'
import { FormSuccess } from '@/components/FormSuccess'

import classes from './LoginForm.module.sass'

const LoginForm: React.FC = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : ''

  const [showTwoFactor, setShowTwoFactor] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [successMessage, setSuccessMessage] = React.useState('')
  const [isPending, startTransition] = React.useTransition()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setErrorMessage('')
    setSuccessMessage('')

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            setErrorMessage(data.error)
          }
          if (data?.success) {
            setSuccessMessage(data.success)
            reset()
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true)
          }
        })
        .catch(() => setErrorMessage('Something went wrong!'))
    })
  }
  return (
    <Card
      headerLabel="Log In"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/registration"
      showSocial
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {showTwoFactor && (
          <>
            <input
              {...register('code')}
              placeholder="123456"
              disabled={isPending}
              className={classes.input}
            />
            <p>{errors?.code?.message}</p>
          </>
        )}

        {!showTwoFactor && (
          <>
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
            <Link href="/auth/reset" className={classes.link}>
              Forgot password?
            </Link>
          </>
        )}

        <FormError message={errorMessage || urlError} />
        <FormSuccess message={successMessage} />

        <button type="submit" disabled={isPending} className={classes.btn}>
          {showTwoFactor ? 'Confirm' : 'Login'}
        </button>
      </form>
    </Card>
  )
}

export { LoginForm }
