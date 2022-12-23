import React from 'react';
import Head from 'next/head';

import { loadCulturePosts } from './api/posts';
import Category from '@/components/Category';
import { Footer, Header, Section } from '@/components';
import SearchBar from '@/components/SearchBar/SearchBar';

const LOAD_MORE_STEP = 4;
export default function SkinCare({ initialPosts, total }) {

  return (
    <>
      <Header />
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Category initialPosts={initialPosts} total={total} category='skin-care' />
      <Section>
        <Footer />
      </Section>
    </>
  );
}

export const getServerSideProps = async () => {
  const categories = "skin-care";
  const { posts, total } = await loadCulturePosts(0, LOAD_MORE_STEP, categories);

  return {
    props: {
      initialPosts: posts,
      total,
    }
  }
}
