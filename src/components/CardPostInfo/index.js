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
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
const CardPostInfo = ({ post, sideBarPosts }) => {
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
          patch: {
            id: post._id,
            set: {
              comments: [newComment],
            },
          },
        },
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
    arrows: true,
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
        breakpoint: 1024,
        settings: {
          arrows: false,
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

  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  return (
    <div className={cl(styles.card, 'card')}>
      <ToastContainer align={'right'} position={'bottom'} />
      <div className={cl(styles.cardBreadCrumbs)}>
        <Link href={'/'}>
          <a>KYRILL KAZAK</a>
        </Link>
        <span>//</span>
        {post?.tags && (
          <Link href={`/tags/${encodeURIComponent(post?.tags?.title)}`}>
            <a>{'#' + post?.tags?.title}</a>
          </Link>
        )}
        <span>/</span>
        <div>{post?.slug?.current}</div>
      </div>
      <hr className={cl(styles.cardHrTop)} />
      <div className={cl(styles.cardTitle)}>{post?.title}</div>
      <div className={cl(styles.cardBlocks)}>
        <div className={cl(styles.cardInfo)}>
          {post?.sliderImages ? (
            <>
              <Slider asNavFor={nav2} ref={slider1 => setNav1(slider1)} {...settings}>
                {post?.sliderImages.map((image, index) => (
                  <div className={cl(styles.cardImg)} key={`image${index}`}>
                    <img src={urlFor(image).url()} alt="" />
                  </div>
                ))}
              </Slider>
              <Slider
                asNavFor={nav1}
                ref={slider2 => setNav2(slider2)}
                slidesToShow={post?.sliderImages?.length}
                swipeToSlide={true}
                focusOnSelect={true}
                className={'slider-inner'}
              >
                {post?.sliderImages.map((image, index) => (
                  <div className={cl(styles.cardImgInner)} key={`image${index}`}>
                    <img src={urlFor(image).url()} alt="" />
                  </div>
                ))}
              </Slider>
            </>
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
            <div className={cl(styles.cardAuthorText)}>
              <h4>
                par <span>{post?.author?.name}</span>
              </h4>
              <Content body={post?.body} />
            </div>
          </div>
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
                <span>{comment?.publishedComment && format(new Date(comment?.publishedComment), 'MMM dd,yyyy')}</span>
                <p>{comment?.description}</p>
              </div>
            ))}
        </div>
        <Sidebar sideBarPosts={sideBarPosts} />
      </div>
      {/*<hr className={cl(styles.cardHrFooter)} />*/}
    </div>
  );
};

export default CardPostInfo;
