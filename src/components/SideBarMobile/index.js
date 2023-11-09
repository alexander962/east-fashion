import React from 'react';
import cl from 'classnames';

import styles from './index.module.scss';
import { urlFor } from '~/lib/client';
import Link from 'next/link';
import { Footer } from '@/components';
import Image from 'next/image';
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
            <div className={cl(styles.sidebarMobileItem)} key={`${index}${post?.title}`}>
              <Link href={`/post/${encodeURIComponent(post?.slug?.current)}`}>
                <a>
                  <div className={cl(styles.sidebarMobileItemImg)}>
                    <Image layout="fill" objectFit="cover" alt="" src={urlFor(post?.mainImage).url()} />
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
