import React from 'react'
import cl from 'classnames'

import styles from './index.module.scss'
import {Post} from "@/components";
const Posts = ({className, posts}) => {
  return (
    <div className={cl(styles.posts)}>
      {posts.map(post => (
        <>
          <Post key={post._id} post={post} />
          <hr />
        </>
      ))}
    </div>
  )
}

export default Posts;
