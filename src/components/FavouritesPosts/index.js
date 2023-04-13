import React from 'react';
import Link from 'next/link';
import cl from 'classnames';
import Slider from 'react-slick';

import { urlFor } from '~/lib/client';
import leftArrow from '../../assets/images/arrow-left.svg';
import rightArrow from '../../assets/images/arrow-right.svg';
import styles from './index.module.scss';
import useWindowSize from '@/hooks/useWindowSize';
const FavouritesPosts = ({ posts }) => {
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
    <div className={cl(styles.favouritesPosts, 'favouritesPosts')}>
      <hr className={styles.favouritesHr} />
      <h2 className={styles.favouritesHeader}>À la Une</h2>
      {width > 768 ? (
        <Slider {...settings}>
          {posts.map((post, index) => {
            if (index < 6) {
              return (
                <div className={cl(styles.inner, index % 2 && styles.innerSmall)} key={post._id}>
                  <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`} className={cl(styles.favouritesPost)}>
                    <div className={cl(styles.favouritesPost)}>
                      <div className={cl(styles.favouritesImg)}>
                        <img src={urlFor(post?.mainImage).url()} alt="" />
                      </div>
                      <div className={styles.favouritesInfo}>
                        <div className={cl(styles.favouritesTag)}>
                          <Link href={`/tags/${encodeURIComponent(post?.tags?.title)}`}>
                            <a>{post?.tags?.title}</a>
                          </Link>
                        </div>
                        <div>
                          <h3 className={cl(styles.favouritesTitle)}>
                            {post?.title?.length > 90 ? (
                              <p>{post?.title.substring(0, 90) + '... '}</p>
                            ) : (
                              <p>{post?.title}</p>
                            )}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            }
          })}
        </Slider>
      ) : (
        <div className={styles.favouritesBlockMobile}>
          {posts.map((post, index) => {
            if (index < 6) {
              return (
                <div className={styles.favouritesBlockInnerMobile}>
                  <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
                    <a>
                      <div className={cl(styles.favouritesImgMobile)}>
                        <img src={urlFor(post?.mainImage).url()} alt="" />
                      </div>
                      <h3 className={cl(styles.favouritesTitleMobile)}>
                        {post?.title?.length > 90 ? (
                          <p>{post?.title.substring(0, 90) + '... '}</p>
                        ) : (
                          <p>{post?.title}</p>
                        )}
                      </h3>
                    </a>
                  </Link>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default FavouritesPosts;
