import React, { useState } from 'react';
import cl from 'classnames';

import { Button, Posts } from '@/components';
import { client } from '~/lib/client';
import styles from '@/components/Category/index.module.scss';

const LOAD_MORE_STEP = 4;
export default function Tags({ posts, setPosts, total, tag, visibleSearchResult }) {
  const [loadedAmount, setLoadedAmount] = useState(LOAD_MORE_STEP);
  const [loading, setLoading] = useState(false);
  const isLoadButton = total > loadedAmount;

  const getMorePosts = async category => {
    setLoading(true);

    try {
      const query = `{
      "dataPosts": *[_type == "post" && !(_id match "drafts*") && ("${tag}" match tags->title)] | order(publishedDate desc) [${loadedAmount}...${
        loadedAmount + LOAD_MORE_STEP
      }] {_id, publishedAt, title, slug, description, mainImage, "categories": categories->{title}, "tags": tags->{title}, comments, "author": author->{name, image}}
      }`;
      const { dataPosts } = await client.fetch(query);
      setLoadedAmount(loadedAmount + LOAD_MORE_STEP);
      setPosts([...posts, ...dataPosts]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <main className={cl(styles.categoryPage)}>
      {posts.length === 0 ? (
        <div className={cl(styles.categoryPageNotFound)}>Articles not found</div>
      ) : (
        <>
          <div className={cl(styles.categoryPage__header)}>
            {!visibleSearchResult ? <span>Post by tag - {`#${tag}`}</span> : <span>Search results</span>}
            <hr />
          </div>
          <Posts posts={posts} />
        </>
      )}
      {isLoadButton && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button onClick={() => getMorePosts(category)} disabled={loading}>
            SHOW MORE
          </Button>
        </div>
      )}
    </main>
  );
}
