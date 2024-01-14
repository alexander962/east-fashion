import React, { useEffect, useRef, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import { loadFavouritesPosts, loadPopularPosts, loadPosts, loadSideBarPosts } from './api/posts';
import { Footer, Header, Section } from '@/components';

const MainPage = dynamic(() => import('@/components/MainPage'));
const ModalMenu = dynamic(() => import('@/components/ModalMenu'));

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
  }, [modalRef, setModalVisible]);

  return (
    <Section>
      <Head>
        <title>Kyrill Kazak</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Kyrill Kazak main page" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:image" content={logo.src} />
        <meta name="twitter:image" content={logo.src} />
      </Head>
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </Section>
  );
}

export const getServerSideProps = async () => {
  const arr = await Promise.all([
    loadPosts(0, LOAD_MORE_STEP),
    loadFavouritesPosts(),
    loadPopularPosts(),
    loadSideBarPosts(),
  ]);

  const { posts, total } = arr[0];
  const { favouritesPosts } = arr[1];
  const { popularPosts } = arr[2];
  const { sideBarPosts } = arr[3];

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
