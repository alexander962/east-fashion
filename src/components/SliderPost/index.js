import React from 'react';
import Link from 'next/link';
import cl from 'classnames';
import Slider from 'react-slick';
import Image from 'next/image';

import { urlFor } from '~/lib/client';
import leftArrow from '../../assets/images/arrow-left.svg';
import rightArrow from '../../assets/images/arrow-right.svg';
import styles from './index.module.scss';
import useWindowSize from '@/hooks/useWindowSize';

const SliderPosts = ({ posts, isFavorite }) => {
  const { width } = useWindowSize();

  const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }) => <span {...props}>{children}</span>;

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
      <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`} className={cl(styles.favouritesPost)}>
        <div className={cl(styles.favouritesPost)}>
          <div className={cl(styles.favouritesImg)}>
            {/*<Image loading="lazy" layout="fill" objectFit="cover" src={urlFor(post?.mainImage).url()} alt="" />*/}
          </div>
          <div className={styles.favouritesInfo}>
            <div className={cl(styles.favouritesTag)}>
              <Link href={`/tags/${encodeURIComponent(post?.tags?.title)}`}>
                <a>{post?.tags?.title}</a>
              </Link>
            </div>
            <div>
              <h3 className={cl(styles.favouritesTitle)}>
                {post?.title?.length > 90 ? <p>{post?.title.substring(0, 90) + '... '}</p> : <p>{post?.title}</p>}
              </h3>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );

  return (
    <div className={cl(styles.favouritesPosts, 'favouritesPosts', !isFavorite && styles.popularPosts)}>
      {isFavorite && <hr className={styles.favouritesHr} />}
      <h2 className={cl(styles.favouritesHeader, !isFavorite && styles.favouritesHeaderPopular)}>
        {isFavorite ? 'À la Une' : 'Les Plus Lus'}
      </h2>

      {width < 768 && isFavorite ? (
        <div className={styles.favouritesBlockMobile}>{posts.slice(0, 6).map(renderPost)}</div>
      ) : (
        <Slider {...settings}>{posts.slice(0, 6).map(renderPost)}</Slider>
      )}
    </div>
  );
};

export default SliderPosts;
