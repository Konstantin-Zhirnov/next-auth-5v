import React from 'react'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'

import classes from './FormSuccess.module.sass'

interface IProps {
  message: string
}
const FormSuccess: React.FC<IProps> = ({ message }) => {
  if (!message) return null

  return (
    <div className={classes.container}>
      <IoIosCheckmarkCircleOutline />
      {message}
    </div>
  )
}

export { FormSuccess }
