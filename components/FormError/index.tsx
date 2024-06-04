import React from 'react'
import { FiAlertTriangle } from 'react-icons/fi'

import classes from './FormError.module.sass'

interface IProps {
  message: string
}
const FormError: React.FC<IProps> = ({ message }) => {
  if (!message) return null

  return (
    <div className={classes.container}>
      <FiAlertTriangle />
      {message}
    </div>
  )
}

export { FormError }
