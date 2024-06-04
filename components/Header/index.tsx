import React from 'react'
import Image from 'next/image'

import { Wrapper } from '../Wrapper'
import { LinkButton } from '../auth/LinkButton'

import classes from './Header.module.sass'
import { LogoutButton } from '@/components/auth/LogoutButton'

interface IProps {
  auth: boolean
}
const Header: React.FC<IProps> = ({ auth }) => {
  return (
    <header className={classes.header}>
      <Wrapper>
        <div className={classes.container}>
          <Image src="/images/logo.png" alt="logo" width={60} height={60} />

          {auth ? (
            <LogoutButton />
          ) : (
            <>
              <LinkButton link="/auth/login" text="Log In" />
              <LinkButton link="/auth/registration" text="Sign Up" />
            </>
          )}
        </div>
      </Wrapper>
    </header>
  )
}

export { Header }
