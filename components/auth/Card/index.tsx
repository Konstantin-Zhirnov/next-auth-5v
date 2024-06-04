'use client'

import React from 'react'

import { Header } from '@/components/auth/Card/Header'
import { Footer } from '@/components/auth/Card/Footer'
import { BackButton } from '@/components/auth/Card/BackButton'

import classes from './Card.module.sass'

interface IProps {
  children: React.ReactNode
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
}

const Card: React.FC<IProps> = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}) => {
  return (
    <div className={classes.container}>
      <Header label={headerLabel} />
      {children}
      {showSocial && <Footer />}
      <BackButton label={backButtonLabel} href={backButtonHref} />
    </div>
  )
}

export { Card }
