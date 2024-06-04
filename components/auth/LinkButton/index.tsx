import React from 'react'
import Link from 'next/link'

import classes from './LinkButton.module.sass'

interface IProps {
  link: string
  text: string
}
const LinkButton: React.FC<IProps> = ({ link, text }) => {
  return (
    <Link className={classes.btn} href={link}>
      {text}
    </Link>
  )
}

export { LinkButton }
