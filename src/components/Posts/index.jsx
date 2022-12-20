import React from 'react'
import cl from 'classnames'

import styles from './index.module.scss'
import {Post} from "@/components";
const Posts = ({className, posts}) => {
  return (
    <div>
      {posts.map(post => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  )
}

export default Posts;
