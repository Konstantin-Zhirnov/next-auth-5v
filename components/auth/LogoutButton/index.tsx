'use client'

import React from 'react'
import { signOut } from 'next-auth/react'

import classes from './LogoutButton.module.sass'

const LogoutButton: React.FC = () => {
  const onClick = () => {
    signOut()
  }

  return (
    <button onClick={onClick} className={classes.btn}>
      Log Out
    </button>
  )
}

export { LogoutButton }
