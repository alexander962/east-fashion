import React from 'react'
import cl from 'classnames'

import styles from './index.module.scss'
import { Section } from '@/components';
const PopularPosts = ({children}) => {
  return (
    <div className={cl(styles.outer)}>
      <div className={cl(styles.inner)}></div>
      <div className={cl(styles.inner)}></div>
      <div className={cl(styles.inner)}></div>
      <div className={cl(styles.inner)}></div>
    </div>
  )
}

export default PopularPosts;
