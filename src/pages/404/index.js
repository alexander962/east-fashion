import React, { useState } from 'react';
import Head from 'next/head';
import cl from 'classnames';
import styles from './index.module.scss';
import { Footer, Header, Section } from '@/components';
import logo from '@/assets/images/logo.jpeg';

const PageNotFound = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [visiblePopularsPosts, setVisiblePopularsPosts] = useState(true);

  return (
    <Section>
      <Head>
        <title>Page Not Found</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:image" content={logo.src} />
        <meta name="twitter:image" content={logo.src} />
      </Head>
      <Header
        searchVisible={false}
        setModalVisible={setModalVisible}
        setPosts={setPosts}
        setVisiblePopularsPosts={setVisiblePopularsPosts}
        setTotalPosts={setTotalPosts}
      />
      <div className={cl(styles.notFound)}>
        <div>
          <h3>Oops:(</h3>
          <h1>404</h1>
          <h6>page not found</h6>
        </div>
      </div>
      <Footer subscribe={false} />
    </Section>
  );
};

export default PageNotFound;
