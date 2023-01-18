import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid'
import cl from 'classnames'
import { format } from "date-fns";
import { client, urlFor } from '~/lib/client';

import { Content, Title } from "@/components";
import avatar from "src/assets/images/avatar.png"
import styles from './index.module.scss';
import Slider from 'react-slick';
import leftArrow from '@/assets/images/arrow-left.svg';
import rightArrow from '@/assets/images/arrow-right.svg';
const CardPostInfo = ({ post }) => {
  const date = format(new Date(post.publishedAt), 'dd MMM yyyy');
  const [inputName, setInputName] = useState('');
  const [inputComment, setInputComment] = useState('');
  const handleNewComment = () => {
    const newComment = {
      _key: nanoid(),
      name: inputName,
      publishedComment: new Date(),
      description: inputComment,
    }

    const mutations = [
      {
        patch: {
          id: post._id,
          insert: {
            after: "commentaries[-1]",
            items: [newComment]
          }
        },
      },
    ]

    client.mutate(mutations[0]);
    if (window) {
      window.scrollTo(0, 0);
      window.location.reload();
    }
  }

  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: false,
    infinite: true,
    prevArrow: <div><img className={'cardArrowLeft'} src={leftArrow.src} alt="" /></div>,
    nextArrow: <div><img className={'cardArrowRight'} src={rightArrow.src} alt="" /></div>,
    fade: true,
    responsive: [
      {
        breakpoint: 1270,
        settings: {
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: false,
          arrows: false,
          dots: true,
        }
      },
    ]
  };

  useEffect(() => {
    const mutations = [
      {
        patch: {
          id: post._id,
          inc: {
            "popularity": 0.5
          }
        },
      },
    ]

    client.mutate(mutations[0]);
  }, [])

  return (
    <div className={cl(styles.card)}>
      <hr className={cl(styles.cardHrTop)} />
      <p className={cl(styles.cardDate)}>{date}</p>
      <Title>{post.title}</Title>
      <div className={cl(styles.cardInfo)}>
        {
          post?.sliderImages ?
            <Slider {...settings}>
              {
                post.sliderImages.map((image) => (
                  <div className={cl(styles.cardImg)}>
                    <img src={urlFor(image).url()} alt='' />
                  </div>
                ))
              }
            </Slider> :
            <div className={cl(styles.cardImg)}>
              <img src={urlFor(post.mainImage).url()} alt='' />
            </div>
        }
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
        <button className={cl(styles.cardBtn)} onClick={handleNewComment}>SEND</button>
        {
          post.comments && post.comments.map((comment => (
            <div className={cl(styles.cardComment)}>
              <hr className={cl(styles.cardCommentHr)} />
              <h4>{comment.name}</h4>
              <span>{format(new Date(comment.publishedComment), 'MMM dd,yyyy')}</span>
              <p>{comment.description}</p>
            </div>
          )))
        }
      </div>
      <hr className={cl(styles.cardHrFooter)} />
    </div>
  )
}

export default CardPostInfo;
