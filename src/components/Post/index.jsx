import React from 'react';
import Link from "next/link";
import cl from 'classnames';

import { urlFor } from '~/lib/client';
import Title from '../Title'
import styles from './index.module.scss';
import { format } from 'date-fns';
const Post = ({className, post, classVariant = 1}) => {
  const date = format(new Date(post?.publishedAt), 'MMM dd,yyyy');

  return (
    <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`} className={cl(className, styles.post)} >
      <div className={cl(styles.post, classVariant === 2 && styles.postLeft, classVariant === 3 && styles.postTwo)}>
        <div className={cl(styles.postInfo, classVariant === 2 && styles.postLeftInfo, classVariant === 3 && styles.postTwoInfo)}>
          {
            date && (
              <p className={cl(styles.postDate, classVariant === 2 && styles.postLeftDate)}>{date}</p>
            )
          }
          <Title>
            {post?.title}
          </Title>
          <p className={styles.postDescription}>
            {
              classVariant === 1 ? post?.description : post?.description.substring(0, 90) + '... '
            }
            {
              (classVariant === 2 || classVariant === 3) && <span>Read more</span>
            }
          </p>
        </div>

        <div className={cl(styles.postImagesBlock, classVariant === 3 && styles.postTwoImages)}>
          <div className={cl(styles.postImg, classVariant === 2 && styles.postLeftImg, classVariant === 3 && styles.postLeftImg, classVariant === 3 && styles.postTwoImg)}>
            <img src={urlFor(post?.mainImage).url()} alt='' />
            {
              post?.tags && (
                <div className={cl(styles.postTag)}>
                  <Link href={`/tags/${encodeURIComponent(post?.tags?.title)}`}>
                    <a>
                      {"#" + post?.tags?.title}
                    </a>
                  </Link>
                </div>
              )
            }
          </div>
          {
            classVariant === 3 &&
            <div className={cl(styles.postImg, classVariant === 3 && styles.postTwoImg)}>
              <img src={urlFor(post?.additionalImage).url()} alt='' />
            </div>
          }
        </div>
        <button className={cl(styles.postBtnMobile)}>Read full article</button>
      </div>
    </Link>
  )
}

export default Post;
