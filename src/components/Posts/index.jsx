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
          <div key={post?._id}>
            <Post post={post} classVariant={classVariant} />
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
