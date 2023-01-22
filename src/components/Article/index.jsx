import React from 'react';
import Link from 'next/link';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import cl from 'classnames';

import styles from './index.module.scss';
const Article = ({ className, backUrl, children }) => {
  return (
    <article className={cl(className, styles.article)}>
      <Link href={backUrl}>
        <a className={styles.articleBack}>
          <AiOutlineArrowLeft />
        </a>
      </Link>
      <div>{children}</div>
    </article>
  );
};

export default Article;
