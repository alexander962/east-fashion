import React, { useState } from 'react';
import Head from 'next/head';
import {Button, Footer, Header, Posts, Section} from "@/components";
import { client } from '~/lib/client';
import cl from 'classnames';
import styles from '@/components/Category/index.module.scss';

const LOAD_MORE_STEP = 4;
export default function Category({ initialPosts, total, category }) {
  const [posts, setPosts] = useState(initialPosts);
  const [loadedAmount, setLoadedAmount] = useState(LOAD_MORE_STEP);
  const [loading, setLoading] = useState(false);
  const isLoadButton = total > loadedAmount;

  const getMorePosts = async (category) => {
    setLoading(true);


    try {
      const query = `{
      "dataPosts": *[_type == "post" && "${category}" in categories[]->title] | order(publishedDate desc) [${loadedAmount}...${loadedAmount + LOAD_MORE_STEP}] {_id, publishedAt, title, slug, description, mainImage, "categories": categories[]->{title}}
      }`;
      const { dataPosts } = await client.fetch(query);
      setLoadedAmount(loadedAmount + LOAD_MORE_STEP);
      setPosts([...posts, ...dataPosts])
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <main className={cl(styles.categoryPage)}>
      <div className={cl(styles.categoryPage__header)}>
        <span>Latest posts</span>
        <hr />
      </div>
      <Posts posts={posts} />
      {
        isLoadButton &&  (
          <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Button
              onClick={() => getMorePosts(category)}
              disabled={loading}
            >
              Load more
            </Button>
          </div>
        )}
    </main>
  );
}