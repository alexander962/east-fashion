import React, { useState } from 'react';
import Head from 'next/head';
import {Button, Footer, Header, Posts, Section} from "@/components";

import { loadCulturePosts, loadPosts } from './api/posts';

const LOAD_MORE_STEP = 4;
export default function Interviews({ initialPosts, total }) {
  const [posts, setPosts] = useState(initialPosts);
  const [loadedAmount, setLoadedAmount] = useState(LOAD_MORE_STEP);
  const [loading, setLoading] = useState(false);

  const isLoadButton = total > loadedAmount;

  const getMorePosts = async () => {
    setLoading(true);

    try {
      const data = await fetch(`/api/posts?start=${loadedAmount}&end=${loadedAmount + LOAD_MORE_STEP}`)
        .then(response => response.json());
      setLoadedAmount(loadedAmount + LOAD_MORE_STEP);
      setPosts([...posts, ...data.posts])

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Section>
          <Posts posts={posts} />
          {
            isLoadButton &&  (
              <div style={{
                display: 'flex',
                justifyContent: 'center'
              }}>
                <Button
                  onClick={getMorePosts}
                  disabled={loading}
                >
                  Load more posts...
                </Button>
              </div>
            )}
        </Section>
        <Section>
          <Footer />
        </Section>
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  const categories = "interviews";
  const { posts, total } = await loadCulturePosts(0, LOAD_MORE_STEP, categories);

  return {
    props: {
      initialPosts: posts,
      total,
    }
  }
}
