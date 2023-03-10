import React, { useState } from 'react';
import cl from 'classnames';

import { Button, Posts } from '@/components';
import { client } from '~/lib/client';
import styles from '@/components/Category/index.module.scss';
import Sidebar from '@/components/Sidebar';

const LOAD_MORE_STEP = 4;
export default function Tags({ posts, setPosts, total, tag, visibleSearchResult, sideBarPosts }) {
  const [loadedAmount, setLoadedAmount] = useState(LOAD_MORE_STEP);
  const [loading, setLoading] = useState(false);
  const isLoadButton = total > loadedAmount;

  const getMorePosts = async () => {
    setLoading(true);

    try {
      const query = `{
      "dataPosts": *[_type == "post" && !(_id match "drafts*") && ("${tag}" match tags->title)] | order(publishedDate desc) [${loadedAmount}...${
        loadedAmount + LOAD_MORE_STEP
      }] {_id, publishedAt, title, slug, description, displayTypes, mainImage, additionalImage, thirdImage, "categories": categories->{title}, "tags": tags->{title}, comments, "author": author->{name, image}}
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
        <div className={cl(styles.categoryPageNotFound)}>Aucun article trouvé</div>
      ) : (
        <>
          <div className={styles.categoryPageBlock}>
            <div>
              <div className={cl(styles.categoryPage__header)}>
                {!visibleSearchResult ? (
                  <span>Articles par tag - {`#${tag}`}</span>
                ) : (
                  <span>Résultats de la recherche</span>
                )}
              </div>
              <Posts posts={posts} />
            </div>
            <Sidebar sideBarPosts={sideBarPosts} />
          </div>
        </>
      )}
      {isLoadButton && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px',
          }}
        >
          <Button onClick={() => getMorePosts()} disabled={loading}>
            VOIR PLUS
          </Button>
        </div>
      )}
    </main>
  );
}
