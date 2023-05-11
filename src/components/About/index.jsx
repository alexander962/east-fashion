import React from 'react';
import cl from 'classnames';

import styles from './index.module.scss';
import { urlFor } from '~/lib/client';
import { Posts } from '@/components';
import Sidebar from '@/components/Sidebar';
import Image from 'next/image';
const AboutPage = ({ aboutInfo, visibleSearchResult, posts, sideBarPosts }) => {
  return (
    <section>
      {visibleSearchResult ? (
        <>
          {posts?.length > 0 ? (
            <div className={styles.searchPageBlock}>
              <div className={cl(styles.searchPage__header)}>
                <span className={cl(styles.searchPage__headerText)}>Dernières publications</span>
                <Posts posts={posts} />
              </div>
              <Sidebar sideBarPosts={sideBarPosts} />
            </div>
          ) : (
            <div className={styles.searchPageBlock}>
              <span className={cl(styles.searchPage__headerText)}>Aucun article trouvé</span>
            </div>
          )}
        </>
      ) : (
        <div>
          <div className={cl(styles.aboutImg)}>
            <Image layout="fill" objectFit="cover" alt="" src={urlFor(aboutInfo?.image).url()} />
          </div>
          <span className={cl(styles.aboutName)}>À propos de nous</span>
          <hr className={cl(styles.aboutHr)} />
          <p className={cl(styles.aboutDescription)}> {aboutInfo?.description} </p>
        </div>
      )}
    </section>
  );
};

export default AboutPage;
