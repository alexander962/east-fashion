import React, { useEffect } from 'react';
import Link from 'next/link';
import cl from 'classnames';
import Slider from 'react-slick';
import Image from 'next/image';

import { urlFor } from '~/lib/client';
import leftArrow from '../../assets/images/arrow-left.svg';
import rightArrow from '../../assets/images/arrow-right.svg';
import styles from './index.module.scss';

const preloadImages = posts => {
  posts.slice(0, 6).forEach(post => {
    const imageUrl = urlFor(post?.mainImage).width(1000).url();
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = imageUrl;
    document.head.appendChild(link);
  });
};

const SliderPosts = ({ posts, isFavorite }) => {
  useEffect(() => {
    preloadImages(posts);
  }, [posts]);

  const SlickButtonFix = ({ children, ...props }) => <span {...props}>{children}</span>;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    variableWidth: true,
    prevArrow: (
      <SlickButtonFix>
        <div>
          <img className={cl(styles.favouritesArrowLeft, 'favouritesArrowLeft')} src={leftArrow.src} alt="" />
        </div>
      </SlickButtonFix>
    ),
    nextArrow: (
      <SlickButtonFix>
        <div>
          <img className={cl(styles.favouritesArrowRight, 'favouritesArrowRight')} src={rightArrow.src} alt="" />
        </div>
      </SlickButtonFix>
    ),
    responsive: [
      {
        breakpoint: 1270,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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

  const renderPost = (post, index) => (
    <div
      className={cl(
        isFavorite && styles.innerFav,
        index % 2 && isFavorite && styles.innerSmall,
        !isFavorite && styles.innerPopular,
        index % 2 && !isFavorite && styles.innerBig
      )}
      key={post._id}
    >
      <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`} passHref>
        <a className={styles.favouritesPost}>
          <div className={styles.favouritesImg}>
            <Image
              loading="lazy"
              layout="fill"
              objectFit="cover"
              src={urlFor(post?.mainImage).width(1000).url()}
              alt=""
            />
          </div>
          <div className={styles.favouritesInfo}>
            <div className={styles.favouritesTag}>
              <Link href={`/tags/${encodeURIComponent(post?.tags?.title)}`}>
                <a>{post?.tags?.title}</a>
              </Link>
            </div>
            <div>
              <h3 className={styles.favouritesTitle}>
                {post?.title?.length > 90 ? <p>{post?.title.substring(0, 90) + '... '}</p> : <p>{post?.title}</p>}
              </h3>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );

  return (
    <div className={cl(styles.favouritesPosts, 'favouritesPosts', !isFavorite && styles.popularPosts)}>
      {isFavorite && <hr className={styles.favouritesHr} />}
      <h2 className={cl(styles.favouritesHeader, !isFavorite && styles.favouritesHeaderPopular)}>
        {isFavorite ? 'À la Une' : 'Les Plus Lus'}
      </h2>

      {isFavorite && <div className={styles.favouritesBlockMobile}>{posts.slice(0, 6).map(renderPost)}</div>}
      <div className={isFavorite && styles.favouritesSlider}>
        <Slider {...settings}>{posts.slice(0, 6).map(renderPost)}</Slider>
      </div>
    </div>
  );
};

export default SliderPosts;
