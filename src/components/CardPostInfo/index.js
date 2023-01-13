import React from 'react'
import cl from 'classnames'
import { format } from "date-fns";
import { urlFor } from '~/lib/client';

import { Content, Title } from "@/components";
import avatar from "src/assets/images/avatar.png"
import styles from './index.module.scss';
const CardPostInfo = ({ post }) => {
  const date = format(new Date(post.publishedAt), 'dd MMM yyyy')

  return (
    <div className={cl(styles.card)}>
      <hr className={cl(styles.cardHrTop)} />
      <p className={cl(styles.cardDate)}>{date}</p>
      <Title>{post.title}</Title>
      <div className={cl(styles.cardInfo)}>
        <div className={cl(styles.cardImg)}>
          <img src={urlFor(post.mainImage).url()} alt='' />
        </div>
        <hr className={cl(styles.cardHrBottom)} />
        <div className={cl(styles.cardAvtor)}>
          <div className={cl(styles.cardAvtorImg)}>
            <img src={avatar.src} alt='' />
          </div>
          <div>
            <span>Posted by</span>
            <h4>Andrea Espinoza</h4>
          </div>
        </div>
        <Content body={post.body} />
      </div>
    </div>
  )
}

export default CardPostInfo;
