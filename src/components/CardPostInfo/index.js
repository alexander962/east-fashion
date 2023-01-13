import React, { useState } from 'react';
import cl from 'classnames'
import { format } from "date-fns";
import { urlFor } from '~/lib/client';

import { Content, Title } from "@/components";
import avatar from "src/assets/images/avatar.png"
import styles from './index.module.scss';
const CardPostInfo = ({ post }) => {
  const date = format(new Date(post.publishedAt), 'dd MMM yyyy');
  const [inputName, setInputName] = useState('');
  const [inputComment, setInputComment] = useState('');

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
        <h3 className={cl(styles.cardSubtitle)}>Join discussion:</h3>
        <input
          className={cl(styles.cardInput)}
          onChange={(e) => setInputName(e.target.value)}
          value={inputName}
          placeholder='Enter your name'
          maxLength="80"
        />
        <textarea
          className={cl(styles.cardInput, styles.cardInputComment)}
          onChange={(e) => setInputComment(e.target.value)}
          value={inputComment}
          placeholder='Comment'
        />
        <button className={cl(styles.cardBtn)}>SEND</button>
        <div className={cl(styles.cardComment)}>
          <hr className={cl(styles.cardCommentHr)} />
          <h4>Andrea Espinoza</h4>
          <span>3 month ago</span>
          <p>When pulpy crime novelists write about the deep, dark corners of the world, what they’re actually referring to is the middle cabinet in my bathroom. It’s wedged into the corner like it’s hiding from someone. And that someone is you. Here, I stash the products in ugly, clinical packaging and the bottles of slightly embarrassing origin that I can’t live without, but that I can live with out-of-sightline. But I’ll open it today, for your entertainment and maybe also even for your service.</p>
        </div>
        <div className={cl(styles.cardComment)}>
          <hr className={cl(styles.cardCommentHr)} />
          <h4>Andrea Espinoza</h4>
          <span>3 month ago</span>
          <p>When pulpy crime novelists write about the deep, dark corners of the world, what they’re actually referring to is the middle cabinet in my bathroom. It’s wedged into the corner like it’s hiding from someone. And that someone is you. Here, I stash the products in ugly, clinical packaging and the bottles of slightly embarrassing origin that I can’t live without, but that I can live with out-of-sightline. But I’ll open it today, for your entertainment and maybe also even for your service.</p>
        </div>
      </div>
      <hr className={cl(styles.cardHrFooter)} />
    </div>
  )
}

export default CardPostInfo;
