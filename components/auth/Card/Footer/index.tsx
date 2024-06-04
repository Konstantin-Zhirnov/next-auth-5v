'use client'

import React from 'react'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { useSearchParams } from 'next/navigation'

import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

import classes from './Footer.module.sass'

const Footer: React.FC = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const handleClick = (provider: 'google' | 'github') => () => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  }
  return (
    <div className={classes.container}>
      <button onClick={handleClick('google')} className={classes.btn}>
        <FcGoogle />
      </button>
      <button onClick={handleClick('github')} className={classes.btn}>
        <FaGithub />
      </button>
    </div>
  )
}

export { Footer }
