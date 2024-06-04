import React from 'react'

import classes from './Wrapper.module.sass'

interface IProps {
  children: React.ReactNode
}

const Wrapper: React.FC<IProps> = ({ children }) => (
  <div className={classes.container}>{children}</div>
)

export { Wrapper }
