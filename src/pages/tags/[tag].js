import React, { useState } from 'react';
import Head from 'next/head';

import { loadTagPosts } from '../api/posts';
import Category from '@/components/Category';
import { Footer, Header, Section } from '@/components';
import ModalMenu from '@/components/ModalMenu';

const LOAD_MORE_STEP = 4;
export default function Interviews({ initialPosts, total, tag }) {
  const [posts, setPosts] = useState(initialPosts);
  const [totalPosts, setTotalPosts] = useState(total);
  const [modalVisible, setModalVisible] = useState(false);
  const [visiblePopularsPosts, setVisiblePopularsPosts] = useState(true);

  return (
    <Section>
      <Head>
        <title>{`Posts by tag - ${tag}`}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ModalMenu setModalVisible={setModalVisible} modalVisible={modalVisible} />
      <Header setPosts={setPosts} setTotalPosts={setTotalPosts} setModalVisible={setModalVisible} setVisiblePopularsPosts={setVisiblePopularsPosts} />
      <Category posts={posts} setPosts={setPosts} total={totalPosts} category='culture' />
      <Footer />
    </Section>
  );
}

export const getServerSideProps = async ({query}) => {
  const { posts } = await loadTagPosts(query.tag);

  return {
    props: {
      initialPosts: posts,
      tag: query.tag,
    }
  }
}
