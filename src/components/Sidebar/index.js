import React from 'react';
import cl from 'classnames';

import styles from './index.module.scss';
import { Footer } from '@/components';
import { urlFor } from '~/lib/client';
import Link from 'next/link';
import Image from 'next/image';
const Sidebar = ({ sideBarPosts = [] }) => {
  return (
    <div className={cl(styles.sidebar)}>
      <h3 className={cl(styles.sidebarTitle)}>À Ne Pas Manquer</h3>
      <div className={cl(styles.sidebarPosts)}>
        {sideBarPosts &&
          sideBarPosts?.map(post => (
            <div key={post._id}>
              <hr />
              <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
                <div className={cl(styles.sidebarItems)}>
                  <div className={cl(styles.sidebarImg)}>
                    <Image layout="fill" objectFit="cover" alt="" src={urlFor(post?.mainImage).url()} />
                  </div>
                  <div className={cl(styles.sidebarInfo)}>
                    <span className={cl(styles.sidebarPostTitle)}>
                      {post?.tags?.title?.length > 40
                        ? post?.tags?.title?.substring(0, 40) + '... '
                        : post?.tags?.title}
                    </span>
                    <p className={cl(styles.sidebarDescription)}>
                      {post?.title?.length > 80 ? post?.title.substring(0, 70) + '... ' : post?.title}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
      <Footer icons={false} classname={styles.footerSidebar} subscribe={true} />
    </div>
  );
};

export default Sidebar;
