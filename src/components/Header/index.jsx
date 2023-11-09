import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import cl from 'classnames';

import { client } from '~/lib/client';
import { loadPosts } from '@/pages/api/posts';
import logo from 'src/assets/images/logo.svg';
import burger from 'src/assets/images/burger.svg';
import search from 'src/assets/images/search.svg';
import close from 'src/assets/images/close.svg';
import styles from './index.module.scss';

const LOAD_MORE_STEP = 4;
const Header = ({
  setPosts,
  setTotalPosts,
  setModalVisible,
  searchVisible = true,
  setVisiblePopularsPosts,
  setVisibleSearchResult,
  category = '',
  tag = '',
}) => {
  const [inputText, setInputText] = useState('');
  const [inputVisible, setInputVisible] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClickButton = async () => {
    setVisibleSearchResult(true);
    if (category) {
      const query = `{
      "searchPosts": *[_type=="post" && (categories match "${category}") &&  !(_id match "drafts*") && ((pt::text(body) match "${inputText}") || title match "${inputText}" || description match "${inputText}")] {_id, popular, publishedAt, title, slug, description, displayTypes, mainImage, additionalImage, thirdImage, "categories": categories->{title}, "tags": tags->{title}, comments}
      }`;
      const { searchPosts } = await client.fetch(query);
      setPosts(searchPosts);
    } else if (tag) {
      const query = `{
      "searchPosts": *[_type=="post" && ("${tag}" match tags->title) && !(_id match "drafts*") && ((pt::text(body) match "${inputText}") || title match "${inputText}" || description match "${inputText}")] {_id, popular, publishedAt, title, slug, description, displayTypes, mainImage, additionalImage, thirdImage, "categories": categories->{title}, "tags": tags->{title}, comments}
      }`;
      const { searchPosts } = await client.fetch(query);
      setPosts(searchPosts);
    } else {
      const query = `{
      "searchPosts": *[_type=="post" && !(_id match "drafts*") && ((pt::text(body) match "${inputText}") || title match "${inputText}" || description match "${inputText}")] {_id, popular, publishedAt, title, slug, description, displayTypes, mainImage, additionalImage, thirdImage, "categories": categories->{title}, "tags": tags->{title}, comments}
      }`;
      const { searchPosts } = await client.fetch(query);
      setPosts(searchPosts);
    }
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
    <div className={styles.headerOuter}>
      {(!inputVisible || width > 768) && (
        <nav className={styles.header}>
          {searchVisible && (
            <div
              className={cl(styles.header__iconSearch, inputVisible && styles.header__iconSearchActive)}
              onClick={() => setInputVisible(true)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="path-1-inside-1_243_292" fill="white">
                  <path
                    fillRule="evenodd"
                    fillRule="evenodd"
                    d="M15.7321 14.3183L15.3404 14.1967L14.7279 14.065C15.8541 12.7518 16.436 10.9603 16.1169 9.05624C15.6758 6.44869 13.4984 4.36639 10.8706 4.04749C6.90061 3.55974 3.55948 6.89891 4.04751 10.8665C4.36661 13.4928 6.45012 15.6689 9.05921 16.1098C10.9644 16.4287 12.757 15.8471 14.0709 14.7216L14.1975 15.3396L14.3243 15.7252L18.313 19.7116C18.6978 20.0961 19.3266 20.0961 19.7114 19.7116C20.0962 19.327 20.0962 18.6986 19.7114 18.314L15.7321 14.3183ZM10.1009 14.3181C7.76403 14.3181 5.8776 12.4328 5.8776 10.0973C5.8776 7.76173 7.76403 5.87641 10.1009 5.87641C12.4379 5.87641 14.3243 7.76173 14.3243 10.0973C14.3243 12.4328 12.4379 14.3181 10.1009 14.3181Z"
                  />
                </mask>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.7321 14.3183L15.3404 14.1967L14.7279 14.065C15.8541 12.7518 16.436 10.9603 16.1169 9.05624C15.6758 6.44869 13.4984 4.36639 10.8706 4.04749C6.90061 3.55974 3.55948 6.89891 4.04751 10.8665C4.36661 13.4928 6.45012 15.6689 9.05921 16.1098C10.9644 16.4287 12.757 15.8471 14.0709 14.7216L14.1975 15.3396L14.3243 15.7252L18.313 19.7116C18.6978 20.0961 19.3266 20.0961 19.7114 19.7116C20.0962 19.327 20.0962 18.6986 19.7114 18.314L15.7321 14.3183ZM10.1009 14.3181C7.76403 14.3181 5.8776 12.4328 5.8776 10.0973C5.8776 7.76173 7.76403 5.87641 10.1009 5.87641C12.4379 5.87641 14.3243 7.76173 14.3243 10.0973C14.3243 12.4328 12.4379 14.3181 10.1009 14.3181Z"
                  fill="#000000"
                />
                <path
                  d="M15.7321 14.3183L16.0864 13.9654L15.9988 13.8775L15.8803 13.8407L15.7321 14.3183ZM15.3404 14.1967L15.4886 13.7192L15.4673 13.7126L15.4455 13.7079L15.3404 14.1967ZM14.7279 14.065L14.3483 13.7395L13.8014 14.3772L14.6228 14.5538L14.7279 14.065ZM16.1169 9.05624L16.61 8.9736L16.6099 8.97285L16.1169 9.05624ZM10.8706 4.04749L10.8096 4.54375L10.8103 4.54384L10.8706 4.04749ZM4.04751 10.8665L4.54386 10.8062L4.54377 10.8055L4.04751 10.8665ZM9.05921 16.1098L8.97591 16.6028L8.97666 16.6029L9.05921 16.1098ZM14.0709 14.7216L14.5607 14.6212L14.3903 13.7896L13.7456 14.3419L14.0709 14.7216ZM14.1975 15.3396L13.7077 15.4399L13.7135 15.4682L13.7225 15.4957L14.1975 15.3396ZM14.3243 15.7252L13.8493 15.8813L13.8865 15.9946L13.9709 16.0789L14.3243 15.7252ZM18.313 19.7116L18.6665 19.3579L18.313 19.7116ZM19.7114 18.314L19.3571 18.6668L19.358 18.6677L19.7114 18.314ZM15.8803 13.8407L15.4886 13.7192L15.1922 14.6742L15.5839 14.7958L15.8803 13.8407ZM15.4455 13.7079L14.833 13.5762L14.6228 14.5538L15.2353 14.6855L15.4455 13.7079ZM15.1074 14.3905C16.3249 12.9709 16.9549 11.0315 16.61 8.9736L15.6238 9.13888C15.9171 10.8892 15.3832 12.5328 14.3483 13.7395L15.1074 14.3905ZM16.6099 8.97285C16.1319 6.14741 13.7788 3.89676 10.9308 3.55113L10.8103 4.54384C13.218 4.83603 15.2196 6.74996 15.6239 9.13964L16.6099 8.97285ZM10.9315 3.55122C6.63919 3.02386 3.02347 6.63678 3.55125 10.9276L4.54377 10.8055C4.09549 7.16105 7.16204 4.09562 10.8096 4.54375L10.9315 3.55122ZM3.55116 10.9268C3.89705 13.7737 6.14927 16.1252 8.97591 16.6028L9.14251 15.6168C6.75097 15.2127 4.83617 13.212 4.54386 10.8062L3.55116 10.9268ZM8.97666 16.6029C11.0355 16.9475 12.9758 16.3181 14.3962 15.1013L13.7456 14.3419C12.5382 15.3762 10.8934 15.9098 9.14176 15.6166L8.97666 16.6029ZM13.5811 14.822L13.7077 15.4399L14.6874 15.2392L14.5607 14.6212L13.5811 14.822ZM13.7225 15.4957L13.8493 15.8813L14.7993 15.5691L14.6725 15.1834L13.7225 15.4957ZM13.9709 16.0789L17.9596 20.0652L18.6665 19.3579L14.6778 15.3715L13.9709 16.0789ZM17.9596 20.0652C18.5396 20.6449 19.4848 20.6449 20.0649 20.0652L19.358 19.3579C19.1684 19.5474 18.856 19.5474 18.6665 19.3579L17.9596 20.0652ZM20.0649 20.0652C20.6451 19.4854 20.6451 18.5402 20.0649 17.9603L19.358 18.6677C19.5474 18.8569 19.5474 19.1686 19.358 19.3579L20.0649 20.0652ZM20.0657 17.9612L16.0864 13.9654L15.3778 14.6711L19.3571 18.6668L20.0657 17.9612ZM10.1009 13.8181C8.03989 13.8181 6.3776 12.1564 6.3776 10.0973H5.3776C5.3776 12.7092 7.48816 14.8181 10.1009 14.8181V13.8181ZM6.3776 10.0973C6.3776 8.03815 8.03989 6.37641 10.1009 6.37641V5.37641C7.48816 5.37641 5.3776 7.48531 5.3776 10.0973H6.3776ZM10.1009 6.37641C12.162 6.37641 13.8243 8.03815 13.8243 10.0973H14.8243C14.8243 7.48531 12.7137 5.37641 10.1009 5.37641V6.37641ZM13.8243 10.0973C13.8243 12.1564 12.162 13.8181 10.1009 13.8181V14.8181C12.7137 14.8181 14.8243 12.7092 14.8243 10.0973H13.8243Z"
                  fill="#000000"
                  mask="url(#path-1-inside-1_243_292)"
                />
              </svg>
            </div>
          )}

          <div className={styles.headerCenter}>
            <div className={styles.header__logo} onClick={handleClickLogo}>
              <Link href={'/'}>
                <a>
                  <img src={logo.src} alt="" width="224px" height="35px" />
                </a>
              </Link>
            </div>
            {inputVisible && (
              <div className={cl(styles.header__inputBlock, styles.header__inputBlockDesktop)}>
                <div onClick={handleClickButton} className={styles.header__inputBlock_img}>
                  <img src={search.src} alt="" />
                </div>
                <input
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyUp={e => handleKeyUp(e)}
                  placeholder="rechercher"
                />
                <div onClick={handleClickClose} className={styles.header__inputBlock_img}>
                  <img src={close.src} alt="" />
                </div>
              </div>
            )}
          </div>

          <div className={styles.headerBurger} onClick={() => setModalVisible(true)}>
            <img src={burger.src} alt="" />
          </div>
        </nav>
      )}
      {inputVisible && (
        <div className={cl(styles.header__inputBlock, styles.header__inputBlockMobile)}>
          <div onClick={handleClickButton} className={styles.header__inputBlock_img}>
            <img src={search.src} alt="" />
          </div>
          <input
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyUp={e => handleKeyUp(e)}
            placeholder="rechercher"
          />
          <div onClick={handleClickClose} className={styles.header__inputBlock_img}>
            <img src={close.src} alt="" />
          </div>
        </div>
      )}

      <nav className={styles.headerNavMobile}>
        <Link href={'/soins-de-beaute'}>
          <a onClick={() => setModalVisible(false)}>Soins de Beauté</a>
        </Link>
        <Link href={'/entretiens'}>
          <a onClick={() => setModalVisible(false)}>Entretiens</a>
        </Link>
        <Link href={'/art-et-culture'}>
          <a onClick={() => setModalVisible(false)}>Art &amp; Culture</a>
        </Link>
        <Link href={'/a-propos'}>
          <a onClick={() => setModalVisible(false)}>À Propos</a>
        </Link>
      </nav>
    </div>
  );
};

export default Header;
