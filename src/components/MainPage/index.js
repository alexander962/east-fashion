import React, { useState, useCallback } from 'react';
import cl from 'classnames';
import { Button, Posts } from '@/components';
import styles from './index.module.scss';
import Sidebar from '@/components/Sidebar';
import SidebarMobile from '@/components/SideBarMobile';
import useWindowSize from '@/hooks/useWindowSize';
import SliderPost from '@/components/SliderPost';

const LOAD_MORE_STEP = 4;

const MainPage = ({ posts, setPosts, total, favouritesPosts, popularPosts, sideBarPosts, visiblePopularsPosts }) => {
  const [loading, setLoading] = useState(false);
  const [loadedAmount, setLoadedAmount] = useState(LOAD_MORE_STEP);
  // const { width } = useWindowSize();

  const isLoadButton = total > loadedAmount;

  const getMorePosts = useCallback(async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/posts?start=${loadedAmount}&end=${loadedAmount + LOAD_MORE_STEP}`);
      const data = await response.json();

      setLoadedAmount(loadedAmount + LOAD_MORE_STEP);
      setPosts(prevPosts => [...prevPosts, ...data.posts]);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching more posts:', error);
      setLoading(false);
    }
  }, [loading, loadedAmount, setPosts]);

  return (
    <main className={cl(styles.mainPage)}>
      {visiblePopularsPosts && (
        <>
          <SliderPost posts={popularPosts} isFavorite={false} />
          <SliderPost posts={favouritesPosts} isFavorite={true} />
          <SidebarMobile sideBarPosts={sideBarPosts} />
        </>
      )}
      {posts.length === 0 ? (
        <div className={cl(styles.mainPageNotFound)}>Aucun article trouvé</div>
      ) : (
        <div className={styles.mainPageBlock}>
          <div className={cl(styles.mainPage__header)}>
            <span className={cl(styles.mainPage__headerText)}>Dernières publications</span>
            <Posts posts={posts} />
          </div>
          <Sidebar sideBarPosts={sideBarPosts} />
        </div>
      )}

      {isLoadButton && (
        <div className={cl(styles.mainPageBtn)}>
          <Button onClick={getMorePosts} disabled={loading} className={cl(styles.mainPage__button)}>
            VOIR PLUS
          </Button>
        </div>
      )}
    </main>
  );
};

export default MainPage;
