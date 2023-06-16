import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { nanoid } from 'nanoid';
import cl from 'classnames';
import { format } from 'date-fns';
import { client, urlFor } from '~/lib/client';

import { Content, Posts, Title } from '@/components';
import leftArrow from '@/assets/images/arrow-left.svg';
import rightArrow from '@/assets/images/arrow-right.svg';
import styles from './index.module.scss';
import { toast, ToastContainer } from 'react-nextjs-toast';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import Image from 'next/image';
import YouTubePlayer from '@/components/YouTubePlayer';
const CardPostInfo = ({ post, sideBarPosts, visibleSearchResult, posts }) => {
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
        showComment: false,
      };

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
      toast.notify('Votre commentaire est en cours de modération et apparaîtra dans quelques minutes.', {
        duration: 5,
        title: 'Bien reçu!',
        fontFamily: 'GillSans',
      });
      setInputName('');
      setInputComment('');
    } else {
      toast.notify('Enter name and comment', {
        duration: 5,
        title: 'Erreur!',
        fontFamily: 'GillSans',
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
    <>
      {visibleSearchResult ? (
        <>
          {posts?.length > 0 ? (
            <div className={styles.searchPageBlock}>
              <div className={cl(styles.searchPage__header)}>
                <span className={cl(styles.searchPage__headerText)}>Dernières publications</span>
                <Posts posts={posts} />
              </div>
              <Sidebar sideBarPosts={sideBarPosts} />
            </div>
          ) : (
            <div className={styles.searchPageBlock}>
              <span className={cl(styles.searchPage__headerText)}>Aucun article trouvé</span>
            </div>
          )}
        </>
      ) : (
        <div className={cl(styles.card, 'card')}>
          <ToastContainer align={'right'} position={'bottom'} />
          <div className={cl(styles.cardBreadCrumbs)}>
            <Link href={'/'}>
              <a>KYRILL KAZAK</a>
            </Link>
            <span>//</span>
            {post?.tags && (
              <Link href={`/tags/${encodeURIComponent(post?.tags?.title)}`}>
                <a>{post?.tags?.title}</a>
              </Link>
            )}
            <span>/</span>
            <div>{post?.title}</div>
          </div>
          <hr className={cl(styles.cardHrTop)} />
          <div className={cl(styles.cardTitle)}>{post?.title}</div>
          <div className={cl(styles.cardBlocks)}>
            <div className={cl(styles.cardInfo)}>
              {post?.sliderImages && post?.sliderImages.length !== 0 ? (
                <>
                  <Slider asNavFor={nav2} ref={slider1 => setNav1(slider1)} {...settings}>
                    {post?.sliderImages.map((image, index) => (
                      <div className={cl(styles.cardImg)} key={`image${index}`}>
                        <Image layout="fill" objectFit="cover" alt="" src={urlFor(image).url()} />
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
                        <Image layout="fill" objectFit="cover" alt="" src={urlFor(image).url()} />
                      </div>
                    ))}
                  </Slider>
                </>
              ) : (
                <div className={cl(styles.cardImg)}>
                  <Image layout="fill" objectFit="cover" alt="" src={urlFor(post.mainImage).url()} />
                </div>
              )}
              <hr className={cl(styles.cardHrBottom)} />
              <div className={cl(styles.cardAuthor)}>
                {post?.author?.image && (
                  <div className={cl(styles.cardAuthorBlock)}>
                    <div className={cl(styles.cardAuthorImg)}>
                      <Image layout="fill" objectFit="cover" alt="" src={urlFor(post?.author?.image).url()} />
                    </div>
                    <h4 className={cl(styles.cardAuthorNameMobile)}>
                      par <span>{post?.author?.name}</span>
                    </h4>
                  </div>
                )}
                <div className={cl(styles.cardAuthorText)}>
                  <h4 className={cl(styles.cardAuthorName)}>
                    par <span>{post?.author?.name}</span>
                  </h4>
                  {post?.body && <Content body={post?.body} />}
                  <div>
                    <h3 className={cl(styles.cardSubtitle)}>Participez à la discussion</h3>
                    <input
                      className={cl(styles.cardInput)}
                      onChange={e => setInputName(e.target.value)}
                      value={inputName}
                      placeholder="Votre nom"
                      maxLength="80"
                    />
                    <textarea
                      className={cl(styles.cardInput, styles.cardInputComment)}
                      onChange={e => setInputComment(e.target.value)}
                      value={inputComment}
                      placeholder="Votre commentaire"
                      maxLength="800"
                    />
                    <button className={cl(styles.cardBtn)} onClick={handleNewComment}>
                      Envoyez
                    </button>
                    {post?.comments &&
                      post?.comments.reverse().map(
                        (comment, index) =>
                          comment.showComment && (
                            <div className={cl(styles.cardComment)} key={`comment${index}`}>
                              <hr className={cl(styles.cardCommentHr)} />
                              <h4>{comment?.name}</h4>
                              <span>
                                {comment?.publishedComment &&
                                  format(new Date(comment?.publishedComment), 'MMM dd,yyyy')}
                              </span>
                              <p>{comment?.description}</p>
                            </div>
                          )
                      )}
                  </div>
                </div>
              </div>
            </div>
            <Sidebar sideBarPosts={sideBarPosts} />
          </div>
        </div>
      )}
    </>
  );
};

export default CardPostInfo;
