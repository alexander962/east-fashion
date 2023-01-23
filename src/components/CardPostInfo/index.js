import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { nanoid } from 'nanoid';
import cl from 'classnames';
import { format } from 'date-fns';
import { client, urlFor } from '~/lib/client';

import { Content, Title } from '@/components';
import leftArrow from '@/assets/images/arrow-left.svg';
import rightArrow from '@/assets/images/arrow-right.svg';
import styles from './index.module.scss';
import { toast, ToastContainer } from 'react-nextjs-toast';
const CardPostInfo = ({ post }) => {
  const date = format(new Date(post?.publishedAt), 'dd MMM yyyy');
  const [inputName, setInputName] = useState('');
  const [inputComment, setInputComment] = useState('');
  const handleNewComment = () => {
    if (inputName !== '' && inputComment !== '') {
      const newComment = {
        _key: nanoid(),
        name: inputName,
        publishedComment: new Date(),
        description: inputComment,
      };

      console.log(post);

      const mutations = [
        {
          patch: {
            id: post._id,
            insert: {
              after: 'comments[-1]',
              items: [newComment],
            },
          },
        },
        {
          set: {
            'comments': [newComment],
          }
        }
      ];

      client.mutate(post.comments ? mutations[0] : mutations[1]);
      toast.notify('Your comment is on moderation now and will appear in a couple of minutes', {
        duration: 5,
        type: 'success',
        title: '',
      });
      setInputName('');
      setInputComment('');
    } else {
      toast.notify('Enter name and comment', {
        duration: 5,
        type: 'error',
        title: '',
      });
    }
  };

  const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }) => <span {...props}>{children}</span>;

  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: false,
    infinite: true,
    prevArrow: (
      <SlickButtonFix>
        <div>
          <img className={'cardArrowLeft'} src={leftArrow.src} alt="" />
        </div>
      </SlickButtonFix>
    ),
    nextArrow: (
      <SlickButtonFix>
        <div>
          <img className={'cardArrowRight'} src={rightArrow.src} alt="" />
        </div>
      </SlickButtonFix>
    ),
    fade: true,
    responsive: [
      {
        breakpoint: 1270,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: false,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  useEffect(() => {
    const mutations = [
      {
        patch: {
          id: post._id,
          inc: {
            popularity: 1,
          },
        },
      },
    ];

    client.mutate(mutations[0]);
  }, []);

  return (
    <div className={cl(styles.card)}>
      <ToastContainer align={'right'} position={'bottom'} />
      <hr className={cl(styles.cardHrTop)} />
      {date && <p className={cl(styles.cardDate)}>{date}</p>}
      <Title>{post?.title}</Title>
      <div className={cl(styles.cardInfo)}>
        {post?.sliderImages ? (
          <Slider {...settings}>
            {post?.sliderImages.map((image, index) => (
              <div className={cl(styles.cardImg)} key={`image${index}`}>
                <img src={urlFor(image).url()} alt="" />
              </div>
            ))}
          </Slider>
        ) : (
          <div className={cl(styles.cardImg)}>
            <img src={urlFor(post.mainImage).url()} alt="" />
          </div>
        )}
        <hr className={cl(styles.cardHrBottom)} />
        <div className={cl(styles.cardAuthor)}>
          {post?.author?.image && (
            <div className={cl(styles.cardAuthorImg)}>
              <img src={urlFor(post?.author?.image).url()} alt="" />
            </div>
          )}
          <div>
            <span>Posted by</span>
            <h4>{post?.author?.name}</h4>
          </div>
        </div>
        <Content body={post?.body} />
        <h3 className={cl(styles.cardSubtitle)}>Join discussion:</h3>
        <input
          className={cl(styles.cardInput)}
          onChange={e => setInputName(e.target.value)}
          value={inputName}
          placeholder="Enter your name"
          maxLength="80"
        />
        <textarea
          className={cl(styles.cardInput, styles.cardInputComment)}
          onChange={e => setInputComment(e.target.value)}
          value={inputComment}
          placeholder="Comment"
          maxLength="800"
        />
        <button className={cl(styles.cardBtn)} onClick={handleNewComment}>
          SEND
        </button>
        {post?.comments &&
          post?.comments.reverse().map((comment, index) => (
            <div className={cl(styles.cardComment)} key={`comment${index}`}>
              <hr className={cl(styles.cardCommentHr)} />
              <h4>{comment?.name}</h4>
              <span>{format(new Date(comment?.publishedComment), 'MMM dd,yyyy')}</span>
              <p>{comment?.description}</p>
            </div>
          ))}
      </div>
      <hr className={cl(styles.cardHrFooter)} />
    </div>
  );
};

export default CardPostInfo;
