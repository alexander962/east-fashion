import React, { useState } from 'react';
import cl from 'classnames'

import styles from './index.module.scss'
import { Button, Posts } from '@/components';
import PopularPosts from '@/components/PopularPosts';
const LOAD_MORE_STEP = 4;
const MainPage = ({posts, setPosts, total}) => {
  const [loading, setLoading] = useState(false);
  const [loadedAmount, setLoadedAmount] = useState(LOAD_MORE_STEP);

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
    <main className={cl(styles.mainPage)}>
      <PopularPosts />
      <div className={cl(styles.mainPage__header)}>
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
              onClick={getMorePosts}
              disabled={loading}
              className={cl(styles.mainPage__button)}
            >
              Load more
            </Button>
          </div>
        )}
    </main>
  )
}

export default MainPage;