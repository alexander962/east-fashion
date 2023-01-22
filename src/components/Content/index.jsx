import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import cl from 'classnames';

import { clientConfig } from '~/lib/client';
import styles from './index.module.scss';
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
        />
      )}
    </>
  );
};

export default Content;
