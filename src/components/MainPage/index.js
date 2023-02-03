import React, { useState } from 'react';
import cl from 'classnames';

import { Button, Posts } from '@/components';
import PopularPosts from '@/components/PopularPosts';
import FavouritesPosts from '@/components/FavouritesPosts';
import styles from './index.module.scss';
import Sidebar from '@/components/Sidebar';

const LOAD_MORE_STEP = 4;
const MainPage = ({
  posts,
  setPosts,
  total,
  favouritesPosts,
  popularPosts,
  sideBarPosts,
  visiblePopularsPosts,
  visibleSearchResult,
}) => {
  const [loading, setLoading] = useState(false);
  const [loadedAmount, setLoadedAmount] = useState(LOAD_MORE_STEP);

  const isLoadButton = total > loadedAmount;
  const getMorePosts = async () => {
    setLoading(true);

    try {
      const data = await fetch(`/api/posts?start=${loadedAmount}&end=${loadedAmount + LOAD_MORE_STEP}`).then(response =>
        response.json()
      );
      setLoadedAmount(loadedAmount + LOAD_MORE_STEP);
      setPosts([...posts, ...data.posts]);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <main className={cl(styles.mainPage)}>
      {visiblePopularsPosts && (
        <>
          <PopularPosts posts={popularPosts} />
          <FavouritesPosts posts={favouritesPosts} />
        </>
      )}
      {posts.length === 0 ? (
        <div className={cl(styles.mainPageNotFound)}>Articles not found</div>
      ) : (
        <>
          <div className={cl(styles.mainPage__header)}>
            <hr className={styles.mainPageHrMain} />
            {!visibleSearchResult ? <span>Latest posts</span> : <span>Search results</span>}
          </div>
          <div className={styles.mainPageBlock}>
            <Posts posts={posts} />
            <Sidebar sideBarPosts={sideBarPosts} />
          </div>
        </>
      )}

      {isLoadButton && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button onClick={getMorePosts} disabled={loading} className={cl(styles.mainPage__button)}>
            SHOW MORE
          </Button>
        </div>
      )}
    </main>
  );
};

export default MainPage;
