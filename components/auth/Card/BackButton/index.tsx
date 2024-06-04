import React from 'react'
import Link from 'next/link'

import classes from './BackButton.module.sass'

interface IProps {
  label: string
  href: string
}

const BackButton: React.FC<IProps> = ({ label, href }) => {
  return (
    <Link href={href} className={classes.link}>
      {label}
    </Link>
  )
}

export { BackButton }
