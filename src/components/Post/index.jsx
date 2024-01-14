import React from 'react';
import Link from 'next/link';
import cl from 'classnames';
import Image from 'next/image';

import { urlFor } from '~/lib/client';
import Title from '../Title';
import styles from './index.module.scss';
import useWindowSize from '@/hooks/useWindowSize';

const Post = ({ post, index }) => {
  const { width } = useWindowSize();

  return (
    <>
      {width > 768 ? (
        <div className={cl(styles.postMain)}>
          {post?.author?.image ? (
            <div className={cl(styles.postAuthor)}>
              <Image loading="lazy" layout="fill" objectFit="cover" alt="" src={urlFor(post?.author?.image).url()} />
            </div>
          ) : (
            <div className={cl(styles.postAuthor, styles.postAuthorBlack)}></div>
          )}
          {post?.displayTypes && post?.displayTypes === 'type1' && (
            <div className={cl(styles.post)}>
              <div className={cl(styles.postInfo)}>
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
                      {post?.title?.length > 55 ? <p>{post?.title.substring(0, 55) + '...'}</p> : <p>{post?.title}</p>}
                    </Title>
                  </a>
                </Link>
                <p className={styles.postDescription}>
                  {post?.description.substring(0, 180) + '  '}
                  <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
                    <a className={cl(styles.postLink)}>
                      <span>{'LIRE PLUS >'}</span>
                    </a>
                  </Link>
                </p>
              </div>

              <div className={cl(styles.postImagesBlock)}>
                <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
                  <a className={cl(styles.postLink)}>
                    <div className={cl(styles.postImg)}>
                      <Image
                        loading="lazy"
                        layout="fill"
                        objectFit="cover"
                        alt=""
                        src={urlFor(post?.mainImage)?.url()}
                      />
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
                    <Image loading="lazy" layout="fill" objectFit="cover" alt="" src={urlFor(post?.mainImage)?.url()} />
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
                        {post?.title?.length > 90 ? (
                          <p>{post?.title.substring(0, 90) + '...'}</p>
                        ) : (
                          <p>{post?.title}</p>
                        )}
                      </h3>
                    </a>
                  </Link>
                  <p className={styles.postType3Description}>
                    {post?.description.substring(0, 180) + '  '}
                    <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
                      <a className={cl(styles.postLink)}>
                        <span>{'LIRE PLUS >'}</span>
                      </a>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}

          {post?.displayTypes && post?.displayTypes === 'type4' && (
            <div className={cl(styles.postType4)} key={post?._id}>
              <div className={cl(styles.postType4Block)}>
                <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
                  <div className={cl(styles.postType4Img, styles.postLink)}>
                    <Image loading="lazy" layout="fill" objectFit="cover" alt="" src={urlFor(post?.mainImage)?.url()} />
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
                        <Image
                          loading="lazy"
                          layout="fill"
                          objectFit="cover"
                          alt=""
                          src={urlFor(post?.additionalImage)?.url()}
                        />
                      </div>
                    </a>
                  </Link>
                )}
              </div>
              <div className={cl(styles.postType3Title)}>
                <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
                  <a className={cl(styles.postLink)}>
                    <h3>
                      {post?.title?.length > 90 ? <p>{post?.title.substring(0, 90) + '...'}</p> : <p>{post?.title}</p>}
                    </h3>
                  </a>
                </Link>
                <p className={styles.postType3Description}>
                  {post?.description.substring(0, 180) + '  '}
                  <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
                    <a className={cl(styles.postLink)}>
                      <span>{'LIRE PLUS >'}</span>
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          )}

          {post?.displayTypes && post?.displayTypes === 'type5' && (
            <div className={cl(styles.postType5)} key={post?._id}>
              <div className={cl(styles.postType5Block)}>
                <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
                  <div className={cl(styles.postType5Img, styles.postLink)}>
                    <Image loading="lazy" layout="fill" objectFit="cover" alt="" src={urlFor(post?.mainImage)?.url()} />
                    {post?.tags && (
                      <div className={cl(styles.postType5Info)}>
                        <Link href={`/tags/${encodeURIComponent(post?.tags?.title)}`}>
                          <div className={cl(styles.postType5Tag)}>
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
                      <div className={cl(styles.postType5ImgAdditional)}>
                        <Image
                          loading="lazy"
                          layout="fill"
                          objectFit="cover"
                          alt=""
                          src={urlFor(post?.additionalImage)?.url()}
                        />
                      </div>
                    )}
                  </a>
                </Link>
              </div>
              <div className={cl(styles.postType3Title)}>
                <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
                  <a className={cl(styles.postLink)}>
                    <h3>
                      {post?.title?.length > 90 ? <p>{post?.title.substring(0, 90) + '...'}</p> : <p>{post?.title}</p>}
                    </h3>
                  </a>
                </Link>
                {post?.description?.length > 180 ? (
                  <>
                    <p className={styles.postType3Description}>
                      {post?.description.substring(0, 180) + '  '}
                      <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
                        <a className={cl(styles.postLink)}>
                          <span>{'LIRE PLUS >'}</span>
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

          {post?.displayTypes && post?.displayTypes === 'type6' && (
            <div className={cl(styles.postType6)} key={post?._id}>
              <div className={cl(styles.postType6Block)}>
                <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
                  <div className={cl(styles.postType6Img, styles.postLink)}>
                    <Image loading="lazy" layout="fill" objectFit="cover" alt="" src={urlFor(post?.mainImage)?.url()} />
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
                  <a className={cl(styles.postLink, styles.postLinkMiddle)}>
                    {post?.additionalImage && (
                      <div className={cl(styles.postType6ImgAdditional)}>
                        <Image
                          loading="lazy"
                          layout="fill"
                          objectFit="cover"
                          alt=""
                          src={urlFor(post?.additionalImage)?.url()}
                        />
                      </div>
                    )}
                  </a>
                </Link>
                <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
                  <a className={cl(styles.postLink)}>
                    {post?.thirdImage && (
                      <div className={cl(styles.postType6ImgThird)}>
                        <Image
                          loading="lazy"
                          layout="fill"
                          objectFit="cover"
                          alt=""
                          src={urlFor(post?.thirdImage)?.url()}
                        />
                      </div>
                    )}
                  </a>
                </Link>
              </div>
              <div className={cl(styles.postType3Title)}>
                <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
                  <a className={cl(styles.postLink)}>
                    <h3>
                      {post?.title?.length > 90 ? <p>{post?.title.substring(0, 90) + '...'}</p> : <p>{post?.title}</p>}
                    </h3>
                  </a>
                </Link>
                <p className={styles.postType3Description}>
                  {post?.description.substring(0, 180) + '  '}
                  <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
                    <a className={cl(styles.postLink)}>
                      <span>{'LIRE PLUS >'}</span>
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={cl(styles.post)}>
          <div className={cl(styles.postImagesBlock)}>
            <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
              <a className={cl(styles.postLink, index === 0 && styles.postLinkFirst)}>
                <div className={cl(styles.postImg, index === 0 && styles.postImgFirst)}>
                  <Image loading="lazy" layout="fill" objectFit="cover" alt="" src={urlFor(post?.mainImage)?.url()} />
                </div>
                <h2 className={cl(styles.postTitle, index === 0 && styles.postTitleFirst)}>
                  {post?.title?.length > 100 ? <p>{post?.title.substring(0, 100) + '...'}</p> : <p>{post?.title}</p>}
                </h2>
              </a>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

const MemoizedPost = React.memo(Post);

export default MemoizedPost;
