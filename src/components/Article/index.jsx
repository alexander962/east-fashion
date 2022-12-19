import React from 'react'
import cl from 'classnames'

import styles from './index.module.scss'

// wrapper on the article
const Article = ({className, children}) => {
  return (
    <article className={cl(className, styles.article)}>{children}</article>
  )
}

export default Article;
