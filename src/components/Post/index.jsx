import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import cl from 'classnames';

import { urlFor } from '~/lib/client';
import Title from '../Title'
import styles from './index.module.scss';
import { format } from 'date-fns';
const Post = ({className, post}) => {
  const { title, mainImage, description, slug, publishedAt } = post;
  const date = format(new Date(publishedAt), 'MMM dd,yyyy');

  return (
    <Link href={`/post/${encodeURIComponent(slug.current)}`} className={cl(className, styles.post)}>
      <a className={cl(className, styles.post)}>
        <div className={cl(styles.postInfo)}>
          <p className={cl(styles.postDate)}>{date}</p>
          <Title>
            {title}
          </Title>
          <p className={styles.postDescription}>
            {description}
            <br/>
          </p>
          <button className={styles.postButton}>Read more &#8599;</button>
        </div>

        <div className={cl(styles.postImg)}>
          <img src={urlFor(mainImage).url()} alt='' />
        </div>
      </a>
    </Link>
  )
}

export default Post;
