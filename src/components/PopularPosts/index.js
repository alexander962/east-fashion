import React from 'react';
import Link from 'next/link';
import cl from 'classnames';
import Slider from 'react-slick';

import { urlFor } from '~/lib/client';
import leftArrow from '../../assets/images/arrow-left.svg';
import rightArrow from '../../assets/images/arrow-right.svg';
import styles from './index.module.scss';
import Image from 'next/image';

const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }) => <span {...props}>{children}</span>;

const PopularPosts = ({ posts }) => {
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
          <img className={cl(styles.popularArrowLeft, 'popularArrowLeft')} src={leftArrow.src} alt="" />
        </div>
      </SlickButtonFix>
    ),
    nextArrow: (
      <SlickButtonFix>
        <div>
          <img className={cl(styles.popularArrowRight, 'popularArrowRight')} src={rightArrow.src} alt="" />
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

  const renderPost = (post, index) => (
    <div className={cl(styles.inner, index % 2 && styles.innerBig)} key={post?._id}>
      <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`} className={cl(styles.popularPost)}>
        <div className={cl(styles.popularPost)}>
          <div className={cl(styles.popularImg)}>
            {/*<Image layout="fill" objectFit="cover" src={urlFor(post?.mainImage).url()} loading="lazy" />*/}
            <div className={cl(styles.popularInfo)}>
              {post?.tags && (
                <div className={cl(styles.popularTag)}>
                  <Link href={`/tags/${encodeURIComponent(post?.tags?.title)}`}>
                    <a>{post?.tags?.title}</a>
                  </Link>
                </div>
              )}
              <div>
                <h3 className={cl(styles.popularTitle)}>
                  {post?.title?.length > 90 ? <p>{post?.title.substring(0, 90) + '... '}</p> : <p>{post?.title}</p>}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );

  return (
    <div className={cl(styles.popularPosts, 'popularPosts')}>
      <h2 className={styles.popularHeader}>Les Plus Lus</h2>
      <Slider {...settings}>{posts.map(renderPost)}</Slider>
    </div>
  );
};

const MemoizedPopularPosts = React.memo(PopularPosts);

export default MemoizedPopularPosts;
