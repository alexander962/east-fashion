import React, { useState } from 'react';
import Head from 'next/head';
import {Button, Footer, Header, Posts, Section} from "@/components";

import { loadPosts } from './api/posts';
import SearchBar from '@/components/SearchBar/SearchBar';
import { client } from '~/lib/client';

const LOAD_MORE_STEP = 4;
export default function Home({ initialPosts, total }) {
  const [posts, setPosts] = useState(initialPosts);
  const [loadedAmount, setLoadedAmount] = useState(LOAD_MORE_STEP);
  const [loading, setLoading] = useState(false);

  const [inputText, setInputText] = useState('');
  // const [inputAmount, setInputAmount] = useState(0);
  const handleClickButton = async () => {
    const query = `{
      "searchPosts": *[_type=="post" && (pt::text(body) match "${inputText}") || title match "${inputText}" || description match "${inputText}"] {_id, publishedAt, title, slug, description, mainImage, "categories": categories[]->{title}}
      }`;
    const { searchPosts } = await client.fetch(query);
    console.log(searchPosts);
    // setInputAmount(inputAmount + LOAD_MORE_STEP);
    setPosts(searchPosts);
    setInputText('');
  }

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
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
          <input
            style={{width: '20%', marginRight: '10px'}}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            style={{background: 'black', color: 'white', cursor: 'pointer'}}
            onClick={handleClickButton}
          >
            Search
          </button>
        </div>
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
  const { posts, total } = await loadPosts(0, LOAD_MORE_STEP);

  return {
    props: {
      initialPosts: posts,
      total
    }
  }
}
