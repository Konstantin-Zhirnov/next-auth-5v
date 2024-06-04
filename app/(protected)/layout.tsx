import React from 'react'

import { Navbar } from '@/app/(protected)/_components/Navbar'

import classes from './Card.module.sass'

interface IProps {
  children: React.ReactNode
}
const ProtectedLayout: React.FC<IProps> = async ({ children }) => {
  return (
    <div className={classes.container}>
      <Navbar />

      {children}
    </div>
  )
}

export default ProtectedLayout
