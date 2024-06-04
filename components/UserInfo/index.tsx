import React from 'react'
import { ExtendedUser } from '@/next-auth'

import classes from './UserInfo.module.sass'

interface IProps {
  user?: ExtendedUser
  label: string
}

const UserInfo: React.FC<IProps> = ({ label, user }) => {
  return (
    <div>
      <h2 className={classes.title}>{label}</h2>
      <div className={classes.line}>
        <p>ID:</p>
        <p>{user?.id}</p>
      </div>
      <div className={classes.line}>
        <p>Name:</p>
        <p>{user?.name}</p>
      </div>
      <div className={classes.line}>
        <p>Email:</p>
        <p>{user?.email}</p>
      </div>
      <div className={classes.line}>
        <p>Role:</p>
        <p>{user?.role}</p>
      </div>
      <div className={classes.line}>
        <p>Two Factor Authentication:</p>
        <p>{user?.isTwoFactorEnabled ? 'ON' : 'OFF'}</p>
      </div>
    </div>
  )
}

export { UserInfo }
