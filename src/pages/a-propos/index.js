import React, { useState } from 'react';
import cl from 'classnames';
import Head from 'next/head';

import { Footer, Header, Section } from '@/components';
import ModalMenu from '@/components/ModalMenu';
import { loadAboutPage, loadSideBarPosts } from '@/pages/api/posts';
import logo from '@/assets/images/logo.jpeg';
import AboutPage from '@/components/About';

const About = ({ aboutInfo, sideBarPosts }) => {
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
      <AboutPage
        aboutInfo={aboutInfo}
        visibleSearchResult={visibleSearchResult}
        posts={posts}
        sideBarPosts={sideBarPosts}
      />
      <Footer subscribe={false} />
    </Section>
  );
};

export default About;

export const getServerSideProps = async () => {
  const { aboutInfo } = await loadAboutPage();
  const { sideBarPosts } = await loadSideBarPosts();

  return {
    props: {
      aboutInfo,
      sideBarPosts,
    },
  };
};
