import React from 'react';
import Link from 'next/link';
import cl from 'classnames';
import Slider from 'react-slick';

import { urlFor } from '~/lib/client';
import leftArrow from '../../assets/images/arrow-left.svg';
import rightArrow from '../../assets/images/arrow-right.svg';
import styles from './index.module.scss';
const FavouritesPosts = ({ posts }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    variableWidth: true,
    prevArrow: (
      <div>
        <img className={cl(styles.favouritesArrowLeft)} src={leftArrow.src} alt="" />
      </div>
    ),
    nextArrow: (
      <div>
        <img className={cl(styles.favouritesArrowRight)} src={rightArrow.src} alt="" />
      </div>
    ),
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

  return (
    <div className={styles.favouritesPosts}>
      <h2 className={styles.favouritesHeader}>Favourites</h2>
      <Slider {...settings}>
        {posts.map((post, index) => {
          if (index < 6) {
            return (
              <div className={cl(styles.inner, index % 2 && styles.innerSmall)} key={post._id}>
                <Link
                  href={`/favouritesPost/${encodeURIComponent(post?.slug?.current)}`}
                  className={cl(styles.favouritesPost)}
                >
                  <a className={cl(styles.favouritesPost)}>
                    <div className={cl(styles.favouritesImg)}>
                      <img src={urlFor(post?.mainImage).url()} alt="" />
                    </div>
                    <h3 className={cl(styles.favouritesTitle)}>{post?.title}</h3>
                  </a>
                </Link>
              </div>
            );
          }
        })}
      </Slider>
    </div>
  );
};

export default FavouritesPosts;
