import React from 'react'
import cl from 'classnames'

import styles from './index.module.scss'
import {Post} from "@/components";
const Posts = ({posts}) => {
  return (
    <div className={cl(styles.posts)}>
      {posts.map((post, index) => {
        let classVariant = index % 2 ? 1 : 2;

        return (
          <>
            <Post key={post._id} post={post} classVariant={classVariant} />
            <hr />
          </>
        );
      })}
    </div>
  )
}

export default Posts;
