'use client'

import React from 'react'
import * as z from 'zod'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { settings } from '@/actions/settings'
import { SettingsSchema } from '@/schemas'
import { FormError } from '@/components/FormError'
import { FormSuccess } from '@/components/FormSuccess'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { UserRole } from '@prisma/client'

import classes from './Settings.module.sass'

const SettingsPage = () => {
  const [isPending, startTransition] = React.useTransition()
  const [errorMessage, setErrorMessage] = React.useState('')
  const [successMessage, setSuccessMessage] = React.useState('')

  const { update } = useSession()
  const user = useCurrentUser()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  })
  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setErrorMessage(data.error)
          }

          if (data.success) {
            update()
            setSuccessMessage(data.success)
          }
        })
        .catch(() => setErrorMessage('Something went wrong!'))
    })
  }
  return (
    <>
      <h2 className={classes.title}>Settings</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('name')}
          placeholder="name"
          disabled={isPending}
          className={classes.input}
        />
        <p className={classes.error}>{errors?.name?.message}</p>
        {user?.isOAuth === false && (
          <>
            <input
              {...register('email')}
              placeholder="email"
              disabled={isPending}
              className={classes.input}
            />
            <p className={classes.error}>{errors?.email?.message}</p>

            <input
              {...register('password')}
              placeholder="password"
              disabled={isPending}
              className={classes.input}
            />
            <p className={classes.error}>{errors?.password?.message}</p>

            <input
              {...register('newPassword')}
              placeholder="new password"
              disabled={isPending}
              className={classes.input}
            />
            <p className={classes.error}>{errors?.newPassword?.message}</p>
          </>
        )}

        <select {...register('role')} disabled={isPending} className={classes.input}>
          <option value={UserRole.ADMIN}>Admin</option>
          <option value={UserRole.USER}>User</option>
        </select>
        <p>{errors?.role?.message}</p>

        {user?.isOAuth === false && (
          <>
            <div className={classes.checkbox}>
              <input {...register('isTwoFactorEnabled')} type="checkbox" disabled={isPending} />
              <p>Two Factor Authentication</p>
            </div>

            <p>{errors?.isTwoFactorEnabled?.message}</p>
          </>
        )}

        <FormError message={errorMessage} />
        <FormSuccess message={successMessage} />

        <button type="submit" disabled={isPending} className={classes.btn}>
          Save
        </button>
      </form>
    </>
  )
}

export default SettingsPage
