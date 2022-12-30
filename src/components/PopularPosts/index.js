import React from 'react'
import cl from 'classnames'

import styles from './index.module.scss'
import { Post, Section } from '@/components';
import { urlFor } from '~/lib/client';
import Link from 'next/link';
const PopularPosts = ({posts}) => {

  return (
    <>
      <h2 className={styles.popularHeader}>Most popular</h2>
      <div className={cl(styles.outer)}>
        {
          posts.map((post, index) => {
            if (index < 4) {
              return (
                <div className={cl(styles.inner)}>
                  <Link href={`/post/${encodeURIComponent(post.slug.current)}`} className={cl(styles.popularPost)}>
                    <a className={cl(styles.popularPost)}>
                      <div className={cl(styles.popularImg)}>
                        <img src={urlFor(post.mainImage).url()} alt='' />
                      </div>
                      <h3 className={cl(styles.popularTitle)}>{post.title}</h3>
                      <p className={cl(styles.popularDesc)}>{post.description}</p>
                    </a>
                  </Link>
                </div>
              )
            }
          })
        }
      </div>
    </>
  )
}

export default PopularPosts;
