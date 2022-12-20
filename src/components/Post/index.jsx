import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import cl from 'classnames';

import { urlFor } from '~/lib/client';
import Title from '../Title'
import styles from './index.module.scss';
const Post = ({className, post}) => {
  const {title, mainImage, description, slug} = post;
  return (
    <Link href={`/post/${encodeURIComponent(slug.current)}`} className={cl(className, styles.post)}>
      <a className={cl(className, styles.post)}>
        <Title type={'small'} className={styles.postTitle}>
          {title}
        </Title>
        <div className={styles.postContent}>
          <div>
            <Image
              src={urlFor(mainImage).url()}
              alt={mainImage.caption}
              width={500}
              height={400}
            />
          </div>
          <p className={styles.postDescription}>
            {description}
          </p>
        </div>
      </a>
    </Link>
  )
}

export default Post;
