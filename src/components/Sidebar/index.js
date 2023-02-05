import React from 'react';
import cl from 'classnames';

import styles from './index.module.scss';
import { Footer } from '@/components';
import { urlFor } from '~/lib/client';
import Link from 'next/link';
const Sidebar = ({ sideBarPosts = [] }) => {
  return (
    <div className={cl(styles.sidebar)}>
      <h3 className={cl(styles.sidebarTitle)}>À Ne Pas Manquer</h3>
      <div className={cl(styles.sidebarPosts)}>
        {sideBarPosts &&
          sideBarPosts?.map(post => (
            <>
              <hr />
              <Link href={`/sideBarPost/${encodeURIComponent(post?.slug?.current)}`}>
                <div className={cl(styles.sidebarItems)}>
                  <div className={cl(styles.sidebarImg)}>
                    <img src={urlFor(post?.mainImage).url()} alt="" />
                  </div>
                  <div className={cl(styles.sidebarInfo)}>
                    <span className={cl(styles.sidebarPostTitle)}>
                      {post?.tags?.title?.length > 40
                        ? post?.tags?.title?.substring(0, 40) + '... '
                        : post?.tags?.title}
                    </span>
                    <p className={cl(styles.sidebarDescription)}>
                      {post?.description?.length > 80 ? post?.description.substring(0, 70) + '... ' : post?.description}
                    </p>
                  </div>
                </div>
              </Link>
            </>
          ))}
      </div>
      <Footer icons={false} classname={styles.footerSidebar} />
    </div>
  );
};

export default Sidebar;
