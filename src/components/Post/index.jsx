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
              <Link href={`/tags/${encodeURIComponent(post?.tags?.title)}`}>
                <div className={cl(styles.postTag)}>
                  <a>{post?.tags?.title}</a>
                </div>
              </Link>
            )}
            <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
              <a className={cl(styles.postLink)}>
                <Title>
                  {post?.title?.length > 55 ? <p>{post?.title.substring(0, 55) + '... '}</p> : <p>{post?.title}</p>}
                </Title>
              </a>
            </Link>
            {post?.description?.length > 180 ? (
              <p className={styles.postDescription}>
                {post?.description.substring(0, 180) + '... '}
                <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
                  <a className={cl(styles.postLink)}>
                    <span>Read more</span>
                  </a>
                </Link>
              </p>
            ) : (
              <p className={styles.postDescription}>{post?.description}</p>
            )}
          </div>

          <div className={cl(styles.postImagesBlock)}>
            <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
              <a className={cl(styles.postLink)}>
                <div className={cl(styles.postImg)}>
                  <img src={urlFor(post?.mainImage)?.url()} alt="" />s
                </div>
              </a>
            </Link>
          </div>
          <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
            <button className={cl(styles.postBtnMobile)}>Read full article</button>
          </Link>
        </div>
      )}

      {post?.displayTypes && (post?.displayTypes === 'type2' || post?.displayTypes === 'type3') && (
        <div className={cl(styles.postType3)} key={post?._id}>
          <div className={cl(styles.postType3Block)}>
            <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
              <div
                className={cl(
                  styles.postType3Img,
                  styles.postLink,
                  post?.displayTypes === 'type3' && styles.postType3ImgBig
                )}
              >
                <img src={urlFor(post?.mainImage)?.url()} alt="" />
                {post?.tags && (
                  <div className={cl(styles.postType3Info)}>
                    <Link href={`/tags/${encodeURIComponent(post?.tags?.title)}`}>
                      <div className={cl(styles.postType3Tag)}>
                        <a>{post?.tags?.title}</a>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </Link>
            <div className={cl(styles.postType3Title)}>
              <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
                <a className={cl(styles.postLink)}>
                  <h3>
                    {post?.title?.length > 90 ? <p>{post?.title.substring(0, 90) + '... '}</p> : <p>{post?.title}</p>}
                  </h3>
                </a>
              </Link>
              {post?.description?.length > 180 ? (
                <>
                  <p className={styles.postType3Description}>
                    {post?.description.substring(0, 180) + '... '}
                    <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
                      <a className={cl(styles.postLink)}>
                        <span>Read more</span>
                      </a>
                    </Link>
                  </p>
                </>
              ) : (
                <p className={styles.postType3Description}>{post?.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {post?.displayTypes && post?.displayTypes === 'type4' && (
        <div className={cl(styles.postType4)} key={post?._id}>
          <div className={cl(styles.postType4Block)}>
            <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
              <div className={cl(styles.postType4Img, styles.postLink)}>
                <img src={urlFor(post?.mainImage)?.url()} alt="" />
                {post?.tags && (
                  <div className={cl(styles.postType4Info)}>
                    <Link href={`/tags/${encodeURIComponent(post?.tags?.title)}`}>
                      <div className={cl(styles.postType4Tag)}>
                        <a>{post?.tags?.title}</a>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </Link>
            {post?.additionalImage && (
              <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
                <a className={cl(styles.postLink)}>
                  <div className={cl(styles.postType4ImgAdditional)}>
                    <img src={urlFor(post?.additionalImage)?.url()} alt="" />
                  </div>
                </a>
              </Link>
            )}
          </div>
          <div className={cl(styles.postType3Title)}>
            <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
              <a className={cl(styles.postLink)}>
                <h3>
                  {post?.title?.length > 90 ? <p>{post?.title.substring(0, 90) + '... '}</p> : <p>{post?.title}</p>}
                </h3>
              </a>
            </Link>
            {post?.description?.length > 180 ? (
              <>
                <p className={styles.postType3Description}>
                  {post?.description.substring(0, 180) + '... '}
                  <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
                    <a className={cl(styles.postLink)}>
                      <span>Read more</span>
                    </a>
                  </Link>
                </p>
              </>
            ) : (
              <p className={styles.postType3Description}>{post?.description}</p>
            )}
          </div>
        </div>
      )}

      {post?.displayTypes && post?.displayTypes === 'type5' && (
        <div className={cl(styles.postType5)} key={post?._id}>
          <div className={cl(styles.postType5Block)}>
            <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
              <div className={cl(styles.postType5Img, styles.postLink)}>
                <img src={urlFor(post?.mainImage)?.url()} alt="" />
                {post?.tags && (
                  <div className={cl(styles.postType5Info)}>
                    <Link href={`/tags/${encodeURIComponent(post?.tags?.title)}`}>
                      <div className={cl(styles.postType5Tag)}>
                        <a>{post?.tags?.title}</a>
                      </div>
                    </Link>
                    <div className={cl(styles.postType5Title)}>
                      <h3>
                        {post?.title?.length > 70 ? (
                          <p>{post?.title.substring(0, 70) + '... '}</p>
                        ) : (
                          <p>{post?.title}</p>
                        )}
                      </h3>
                    </div>
                  </div>
                )}
              </div>
            </Link>
            <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
              <a className={cl(styles.postLink)}>
                {post?.additionalImage && (
                  <div className={cl(styles.postType5ImgAdditional)}>
                    <img src={urlFor(post?.additionalImage)?.url()} alt="" />
                  </div>
                )}
              </a>
            </Link>
          </div>
        </div>
      )}

      {post?.displayTypes && post?.displayTypes === 'type6' && (
        <div className={cl(styles.postType6)} key={post?._id}>
          <div className={cl(styles.postType6Block)}>
            <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
              <div className={cl(styles.postType6Img, styles.postLink)}>
                <img src={urlFor(post?.mainImage)?.url()} alt="" />
                {post?.tags && (
                  <div className={cl(styles.postType6Info)}>
                    <Link href={`/tags/${encodeURIComponent(post?.tags?.title)}`}>
                      <div className={cl(styles.postType6Tag)}>
                        <a>{post?.tags?.title}</a>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </Link>
            <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
              <a className={cl(styles.postLink)}>
                {post?.additionalImage && (
                  <div className={cl(styles.postType6ImgAdditional)}>
                    <img src={urlFor(post?.additionalImage)?.url()} alt="" />
                  </div>
                )}
              </a>
            </Link>
            <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
              <a className={cl(styles.postLink)}>
                {post?.thirdImage && (
                  <div className={cl(styles.postType6ImgThird)}>
                    <img src={urlFor(post?.thirdImage)?.url()} alt="" />
                  </div>
                )}
              </a>
            </Link>
          </div>
          <div className={cl(styles.postType3Title)}>
            <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
              <a className={cl(styles.postLink)}>
                <h3>
                  {post?.title?.length > 90 ? <p>{post?.title.substring(0, 90) + '... '}</p> : <p>{post?.title}</p>}
                </h3>
              </a>
            </Link>
            {post?.description?.length > 180 ? (
              <>
                <p className={styles.postType3Description}>
                  {post?.description.substring(0, 180) + '... '}
                  <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
                    <a className={cl(styles.postLink)}>
                      <span>Read more</span>
                    </a>
                  </Link>
                </p>
              </>
            ) : (
              <p className={styles.postType3Description}>{post?.description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
