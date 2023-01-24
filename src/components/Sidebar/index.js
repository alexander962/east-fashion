import React from 'react';
import cl from 'classnames';

import styles from './index.module.scss';
import { Footer } from '@/components';
import { urlFor } from '~/lib/client';
const Sidebar = ({ popularPosts }) => {
  return (
    <div className={cl(styles.sidebar)}>
      <h3 className={cl(styles.sidebarTitle)}>Most Popular</h3>
      <div>
        {popularPosts?.map(post => (
          <div className={cl(styles.sidebarItems)}>
            <div className={cl(styles.sidebarImg)}>
              <img src={urlFor(post?.mainImage).url()} alt="" />
            </div>
            <div className={cl(styles.sidebarInfo)}>
              <span className={cl(styles.sidebarPostTitle)}>{post?.title}</span>
              <p className={cl(styles.sidebarDescription)}>
                {post?.description?.length > 80 ? post?.description.substring(0, 80) + '... ' : post?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <Footer icons={false} classname={styles.footerSidebar} />
    </div>
  );
};

export default Sidebar;
