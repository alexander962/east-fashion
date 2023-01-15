import React from 'react';
import Link from "next/link";
import cl from 'classnames';

import { urlFor } from '~/lib/client';
import Title from '../Title'
import styles from './index.module.scss';
import { format } from 'date-fns';
const Post = ({className, post, classVariant = 1}) => {
  const { title, mainImage, description, slug, publishedAt } = post;
  const date = format(new Date(publishedAt), 'MMM dd,yyyy');

  return (
    <Link href={`/post/${encodeURIComponent(slug.current)}`} className={cl(className, styles.post)}>
      <a className={cl(styles.post, classVariant === 2 && styles.postLeft)}>
        <div className={cl(styles.postInfo, classVariant === 2 && styles.postLeftInfo)}>
          <p className={cl(styles.postDate, classVariant === 2 && styles.postLeftDate)}>{date}</p>
          <Title>
            {title}
          </Title>
          <p className={styles.postDescription}>
            {
              classVariant === 1 ? description : description.substring(0, 90) + '... '
            }
            {
              classVariant === 2 && <span>Read more</span>
            }
          </p>
          <button className={cl(styles.postBtnMobile)}>Read full article</button>
        </div>

        <div className={cl(styles.postImg, classVariant === 2 && styles.postLeftImg)}>
          <img src={urlFor(mainImage).url()} alt='' />
        </div>
      </a>
    </Link>
  )
}

export default Post;
