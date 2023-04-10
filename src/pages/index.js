import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

import { Footer, Header, Section } from '@/components';
import { loadFavouritesPosts, loadPopularPosts, loadPosts, loadSideBarPosts } from './api/posts';
import MainPage from '@/components/MainPage';
import ModalMenu from '@/components/ModalMenu';
import logo from '../assets/images/logo.jpeg';

const LOAD_MORE_STEP = 4;
export default function Home({ initialPosts, total, favouritesPosts, popularPosts, sideBarPosts }) {
  const [posts, setPosts] = useState(initialPosts);
  const [totalPosts, setTotalPosts] = useState(total);
  const [modalVisible, setModalVisible] = useState(false);
  const [visiblePopularsPosts, setVisiblePopularsPosts] = useState(true);
  const [visibleSearchResult, setVisibleSearchResult] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalVisible(false);
      }
    }

    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [modalRef]);

  return (
    <Section>
      <Head>
        <title>Kyrill Kazak</title>
        {/*<meta name="description" content="Generated by create next app" />*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={logo.src} />

        <meta property="og:image" content={logo.src} />
        <meta name="twitter:image" content={logo.src} />
      </Head>
      <ModalMenu setModalVisible={setModalVisible} modalVisible={modalVisible} />
      <Header
        setPosts={setPosts}
        setTotalPosts={setTotalPosts}
        setModalVisible={setModalVisible}
        setVisiblePopularsPosts={setVisiblePopularsPosts}
        setVisibleSearchResult={setVisibleSearchResult}
      />
      <MainPage
        posts={posts}
        setPosts={setPosts}
        total={totalPosts}
        favouritesPosts={favouritesPosts}
        popularPosts={popularPosts}
        sideBarPosts={sideBarPosts}
        visiblePopularsPosts={visiblePopularsPosts}
        visibleSearchResult={visibleSearchResult}
      />
      <Footer subscribe={false} />
    </Section>
  );
}

export const getServerSideProps = async () => {
  const { posts, total } = await loadPosts(0, LOAD_MORE_STEP);
  const { favouritesPosts } = await loadFavouritesPosts();
  const { popularPosts } = await loadPopularPosts();
  const { sideBarPosts } = await loadSideBarPosts();

  return {
    props: {
      initialPosts: posts,
      total,
      favouritesPosts,
      popularPosts,
      sideBarPosts,
    },
  };
};
