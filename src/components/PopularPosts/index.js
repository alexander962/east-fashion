import React from 'react';
import Link from 'next/link';
import cl from 'classnames';
import Slider from "react-slick";
import { urlFor } from '~/lib/client';

import leftArrow from '../../assets/images/arrow-left.svg'
import rightArrow from '../../assets/images/arrow-right.svg'
import styles from './index.module.scss';
const PopularPosts = ({ posts }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    variableWidth: true,
    prevArrow: <div><img className={cl(styles.popularArrowLeft)} src={leftArrow.src} alt="" /></div>,
    nextArrow: <div><img className={cl(styles.popularArrowRight)} src={rightArrow.src} alt="" /></div>,
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

  return (
    <div className={styles.popularPosts}>
      <h2 className={styles.popularHeader}>Most popular</h2>
        <Slider {...settings}>
        {
          posts.map((post, index) => {
            return (
              <div className={cl(styles.inner, index % 2 && styles.innerBig)}>
                <Link href={`/post/${encodeURIComponent(post.slug.current)}`} className={cl(styles.popularPost)}>
                  <div className={cl(styles.popularPost)}>
                    <div className={cl(styles.popularImg)}>
                      <img src={urlFor(post.mainImage).url()} alt='' />
                      <div className={cl(styles.popularTag)}>
                        <Link href={`/tags/${encodeURIComponent(post?.tags[0]?.title)}`}>
                          <a>
                            {"#" + post?.tags[0]?.title}
                          </a>
                        </Link>
                      </div>
                    </div>
                    <h3 className={cl(styles.popularTitle)}>{post.title}</h3>
                  </div>
                </Link>
              </div>
            )
          })
        }
        </Slider>
    </div>
  )
}

export default PopularPosts;
