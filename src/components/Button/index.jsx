import React from 'react'
import cl from 'classnames'

import styles from './index.module.scss'
const Button = ({className, children, disabled, onClick}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cl(styles.button)}
    >
      {children}
    </button>
  )
}

export default Button;
