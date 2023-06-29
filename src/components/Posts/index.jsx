import React from 'react';
import cl from 'classnames';

import { Post } from '@/components';
import styles from './index.module.scss';

const Posts = ({ posts }) => {
  return (
    <div className={cl(styles.posts)}>
      {posts.map((post, index) => {
        let classVariant = post.additionalImage ? 3 : index % 2 ? 1 : 2;

        return (
          <div key={post?._id} className={cl(styles.postWrapper)}>
            <Post post={post} classVariant={classVariant} index={index} />
            <hr className={styles.postHr} />
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
