import React, { useState } from 'react';
import cl from 'classnames';
import Head from 'next/head';

import { Footer, Header, Section } from '@/components';
import ModalMenu from '@/components/ModalMenu';
import { loadAboutPage } from '@/pages/api/posts';
import { urlFor } from '~/lib/client';
import styles from './index.module.scss';
import logo from '@/assets/images/logo.jpeg';

const About = ({ aboutInfo }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [visiblePopularsPosts, setVisiblePopularsPosts] = useState(true);
  const [visibleSearchResult, setVisibleSearchResult] = useState(false);

  return (
    <Section>
      <Head>
        <title>À Propos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:image" content={logo.src} />
        <meta name="twitter:image" content={logo.src} />
      </Head>
      <ModalMenu setModalVisible={setModalVisible} modalVisible={modalVisible} />
      <Header
        setModalVisible={setModalVisible}
        setPosts={setPosts}
        setVisiblePopularsPosts={setVisiblePopularsPosts}
        setTotalPosts={setTotalPosts}
        setVisibleSearchResult={setVisibleSearchResult}
      />
      <div className={cl(styles.aboutImg)}>
        <img src={urlFor(aboutInfo.image).url()} alt="" />
      </div>
      <span className={cl(styles.aboutName)}>À propos de nous</span>
      <hr className={cl(styles.aboutHr)} />
      {/*<p className={cl(styles.aboutTitle)}>{aboutInfo.title}</p>*/}
      <p className={cl(styles.aboutDescription)}> {aboutInfo.description} </p>
      <Footer subscribe={false} />
    </Section>
  );
};

export default About;

export const getServerSideProps = async () => {
  const { aboutInfo } = await loadAboutPage();

  return {
    props: {
      aboutInfo,
    },
  };
};
