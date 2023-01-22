import React, { useState } from 'react';
import Link from 'next/link';
import cl from 'classnames';

import { client } from '~/lib/client';
import { loadPosts } from '@/pages/api/posts';
import logo from 'src/assets/images/logo.svg';
import burger from 'src/assets/images/burger.svg';
import search from 'src/assets/images/search.svg';
import close from 'src/assets/images/close.svg';
import facebook from 'src/assets/images/facebook.svg';
import twitter from 'src/assets/images/twitter.svg';
import youtube from 'src/assets/images/youtube.svg';
import styles from './index.module.scss';

const LOAD_MORE_STEP = 4;
const Header = ({
  setPosts,
  setTotalPosts,
  setModalVisible,
  searchVisible = true,
  setVisiblePopularsPosts,
  setVisibleSearchResult,
}) => {
  const [inputText, setInputText] = useState('');
  const [inputVisible, setInputVisible] = useState(false);
  const handleClickButton = async () => {
    setVisibleSearchResult(true);
    const query = `{
      "searchPosts": *[_type=="post" && !(_id match "drafts*") && ((pt::text(body) match "${inputText}") || title match "${inputText}" || description match "${inputText}")] {_id, popular, publishedAt, title, slug, description, mainImage, "categories": categories->{title}, "tags": tags->{title}, comments}
      }`;
    const { searchPosts } = await client.fetch(query);
    setPosts(searchPosts);
    setVisiblePopularsPosts(false);
    setInputText('');
    setTotalPosts(0);
  };

  const handleKeyUp = e => {
    if (e.keyCode === 13) {
      handleClickButton();
    }
  };

  const handleClickClose = () => {
    setInputText('');
    setInputVisible(false);
  };

  const handleClickLogo = async () => {
    const { posts, total } = await loadPosts(0, LOAD_MORE_STEP);
    setPosts(posts);
    setVisiblePopularsPosts(true);
    setInputText('');
    setTotalPosts(total);
    setInputText('');
    setInputVisible(false);
  };

  return (
    <>
      <nav className={styles.header}>
        <div className={styles.header__logo} onClick={handleClickLogo}>
          <Link href={'/'}>
            <a>
              <img src={logo.src} alt="" />
            </a>
          </Link>
        </div>
        {inputVisible ? (
          <div className={cl(styles.header__inputBlock, styles.header__inputBlockDesktop)}>
            <div onClick={handleClickButton} className={styles.header__inputBlock_img}>
              <img src={search.src} />
            </div>
            <input
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyUp={e => handleKeyUp(e)}
              placeholder="search"
            />
            <div onClick={handleClickClose} className={styles.header__inputBlock_img}>
              <img src={close.src} />
            </div>
          </div>
        ) : (
          <div className={styles.header__menu}>
            <Link href={'/interviews'}>
              <a>Interviews</a>
            </Link>
            <Link href={'/skin-care'}>
              <a>Skin Care</a>
            </Link>
            <Link href={'/culture'}>
              <a>Culture</a>
            </Link>
            <Link href={'/about'}>
              <a>About us</a>
            </Link>
          </div>
        )}

        <div className={styles.header__icons}>
          {searchVisible && (
            <div className={styles.header__iconSearch} onClick={() => setInputVisible(true)}>
              <img src={search.src} alt="" />
            </div>
          )}
          <div className={styles.header__iconBurger} onClick={() => setModalVisible(true)}>
            <img src={burger.src} alt="" />
          </div>
          <a href="#" target="_blank">
            <img src={facebook.src} alt="" />
          </a>
          <a href="#" target="_blank">
            <img src={twitter.src} alt="" />
          </a>
          <a href="#" target="_blank">
            <img src={youtube.src} alt="" />
          </a>
        </div>
      </nav>
      {inputVisible && (
        <div className={cl(styles.header__inputBlock, styles.header__inputBlockMobile)}>
          <div onClick={handleClickButton} className={styles.header__inputBlock_img}>
            <img src={search.src} />
          </div>
          <input
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyUp={e => handleKeyUp(e)}
            placeholder="search"
          />
          <div onClick={handleClickClose} className={styles.header__inputBlock_img}>
            <img src={close.src} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
