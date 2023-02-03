import React from 'react';
import Link from 'next/link';
import cl from 'classnames';
import { format } from 'date-fns';

import { urlFor } from '~/lib/client';
import Title from '../Title';
import styles from './index.module.scss';
const Post = ({ post }) => {
  // const date = format(new Date(post?.publishedAt), 'MMM dd,yyyy');
  // <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`} className={cl(className, styles.post)}>
  console.log(post);

  return (
    <div className={cl(styles.postMain)}>
      {post?.author?.image ? (
        <div className={cl(styles.postAuthor)}>
          <img src={urlFor(post?.author?.image).url()} alt="" />
        </div>
      ) : (
        <div className={cl(styles.postAuthor, styles.postAuthorBlack)}></div>
      )}
      {post?.displayTypes && post?.displayTypes === 'type1' && (
        <div className={cl(styles.post)}>
          <div className={cl(styles.postInfo)}>
            {/*{date && <p className={cl(styles.postDate)}>{date}</p>}*/}
            {post?.tags && (
              <div className={cl(styles.postTag)}>
                <Link href={`/tags/${encodeURIComponent(post?.tags?.title)}`}>
                  <a>{'#' + post?.tags?.title}</a>
                </Link>
              </div>
            )}
            <Title>
              {post?.title?.length > 55 ? <p>{post?.title.substring(0, 55) + '... '}</p> : <p>{post?.title}</p>}
            </Title>
            {post?.description?.length > 180 ? (
              <>
                <p className={styles.postDescription}>
                  {post?.description.substring(0, 180) + '... '}
                  <span>Read more</span>
                </p>
              </>
            ) : (
              <p className={styles.postDescription}>{post?.description}</p>
            )}
          </div>

          <div className={cl(styles.postImagesBlock)}>
            <div className={cl(styles.postImg)}>
              <img src={urlFor(post?.mainImage)?.url()} alt="" />s
            </div>
          </div>
          <button className={cl(styles.postBtnMobile)}>Read full article</button>
        </div>
      )}

      {post?.displayTypes && (post?.displayTypes === 'type2' || post?.displayTypes === 'type3') && (
        <div className={cl(styles.postType3)} key={post?._id}>
          <div className={cl(styles.postType3Block)}>
            <div className={cl(styles.postType3Img, post?.displayTypes === 'type3' && styles.postType3ImgBig)}>
              <img src={urlFor(post?.mainImage)?.url()} alt="" />
              {post?.tags && (
                <div className={cl(styles.postType3Info)}>
                  <div className={cl(styles.postType3Tag)}>
                    <Link href={`/tags/${encodeURIComponent(post?.tags?.title)}`}>
                      <a>{'#' + post?.tags?.title}</a>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className={cl(styles.postType3Title)}>
              <h3>
                {post?.title?.length > 90 ? <p>{post?.title.substring(0, 90) + '... '}</p> : <p>{post?.title}</p>}
              </h3>
              {post?.description?.length > 180 ? (
                <>
                  <p className={styles.postType3Description}>
                    {post?.description.substring(0, 180) + '... '}
                    <span>Read more</span>
                  </p>
                </>
              ) : (
                <p className={styles.postType3Description}>{post?.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {post?.displayTypes && (post?.displayTypes === 'type4' || post?.displayTypes === 'type5') && (
        <div className={cl(styles.postType4)} key={post?._id}>
          <div className={cl(styles.postType4Block)}>
            <div className={cl(styles.postType4Img)}>
              <img src={urlFor(post?.mainImage)?.url()} alt="" />
              {post?.tags && (
                <div className={cl(styles.postType4Info)}>
                  <div className={cl(styles.postType4Tag)}>
                    <Link href={`/tags/${encodeURIComponent(post?.tags?.title)}`}>
                      <a>{'#' + post?.tags?.title}</a>
                    </Link>
                  </div>
                  <div className={cl(styles.postType4Title)}>
                    <h3>{post?.title}</h3>
                  </div>
                </div>
              )}
            </div>
            {post?.additionalImage && (
              <div className={cl(styles.postType4ImgAdditional)}>
                <img src={urlFor(post?.additionalImage)?.url()} alt="" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
