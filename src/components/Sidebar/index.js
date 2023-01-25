import React from 'react';
import cl from 'classnames';

import styles from './index.module.scss';
import { Footer } from '@/components';
import { urlFor } from '~/lib/client';
import Link from 'next/link';
const Sidebar = ({ popularPosts }) => {
  return (
    <div className={cl(styles.sidebar)}>
      <h3 className={cl(styles.sidebarTitle)}>Les Plus Lus</h3>
      <div>
        {popularPosts?.map(post => (
          <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
            <div className={cl(styles.sidebarItems)}>
              <div className={cl(styles.sidebarImg)}>
                <img src={urlFor(post?.mainImage).url()} alt="" />
              </div>
              <div className={cl(styles.sidebarInfo)}>
                <span className={cl(styles.sidebarPostTitle)}>
                  {post?.title?.length > 40 ? post?.title.substring(0, 40) + '... ' : post?.title}
                </span>
                <p className={cl(styles.sidebarDescription)}>
                  {post?.description?.length > 80 ? post?.description.substring(0, 80) + '... ' : post?.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <hr />
      <Footer icons={false} classname={styles.footerSidebar} />
    </div>
  );
};

export default Sidebar;
