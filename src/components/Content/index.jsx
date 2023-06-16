import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import cl from 'classnames';

import { clientConfig, urlFor } from '~/lib/client';
import styles from './index.module.scss';
import Image from 'next/image';
import YouTubePlayer from '@/components/YouTubePlayer';

const serializers = {
  marks: {
    link: ({ children, mark: { href, target } }) => (
      <a href={href} target={target ? '_blank' : '_self'} rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
  types: {
    cardItem: ({ node: { title, href, imageCard, btnText } }) => (
      <a href={href} target={'_blank'} className={styles.blockBody}>
        <div className={styles.blockBodyTop}>
          <div className={cl(styles.blockBodyImage)}>
            <Image layout="fill" objectFit="cover" alt="" src={urlFor(imageCard).url()} />
          </div>
          <div className={styles.blockBodyTitle}>{title}</div>
        </div>
        <button className={styles.blockBodyBtn}>{btnText}</button>
      </a>
    ),

    video: ({ node: { videoId } }) => (
      <div className={styles.cardVideo}>
        <YouTubePlayer videoId={videoId} />
      </div>
    ),
  },
};
const Content = ({ body }) => {
  return (
    <>
      {body && (
        <BlockContent
          blocks={body}
          imageOptions={{ w: 1000, h: 750, fit: 'max' }}
          projectId={clientConfig.projectId}
          dataset={clientConfig.dataset}
          className={cl(styles.content)}
          renderContainerOnSingleChild
          serializers={serializers}
        />
      )}
    </>
  );
};

export default Content;
