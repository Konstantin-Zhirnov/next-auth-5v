'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Poppins } from 'next/font/google'

import classes from './Header.module.sass'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})
interface IProps {
  label: string
}

const Header: React.FC<IProps> = ({ label }) => {
  const router = useRouter()

  return <h2 className={(font.className, classes.card_header)}>{label}</h2>
}

export { Header }
