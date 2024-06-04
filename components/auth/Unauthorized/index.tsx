import React from 'react'

import classes from './Unauthorized.module.sass'

const Unauthorized: React.FC = () => {
  return (
    <div className={classes.container}>
      <h1>Auth 🔐</h1>
      <p>A simple authentication service</p>
    </div>
  )
}

export { Unauthorized }
