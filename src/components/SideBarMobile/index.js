import React from 'react';
import cl from 'classnames';

import styles from './index.module.scss';
import { urlFor } from '~/lib/client';
import Link from 'next/link';
import { Footer } from '@/components';
const SidebarMobile = ({ sideBarPosts = [] }) => {
  return (
    <div className={cl(styles.sidebarMobile)}>
      <hr />
      <Footer icons={false} classname={styles.footerSidebarMobile} subscribe={true} />
      <hr className={cl(styles.sidebarMobileHr)} />
      <h3 className={cl(styles.sidebarMobileTitle)}>À Ne Pas Manquer</h3>
      <div className={cl(styles.sidebarMobileItems)}>
        {sideBarPosts &&
          sideBarPosts?.map((post, index) => (
            <div className={cl(styles.sidebarMobileItem)}>
              <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
                <a>
                  <div className={cl(styles.sidebarMobileItemImg)}>
                    <img src={urlFor(post?.mainImage).url()} alt="" />
                  </div>
                  <p className={cl(styles.sidebarMobileDescription)}>
                    {post?.title?.length > 80 ? post?.title.substring(0, 70) + '... ' : post?.title}
                  </p>
                </a>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SidebarMobile;
