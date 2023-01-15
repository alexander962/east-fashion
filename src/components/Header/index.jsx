import React, { useState } from 'react';
import Link from 'next/link';

import logo from 'src/assets/images/logo.svg';
import burger from 'src/assets/images/burger.svg';
import search from 'src/assets/images/search.svg';
import close from 'src/assets/images/close.svg';
import facebook from 'src/assets/images/facebook.svg';
import twitter from 'src/assets/images/twitter.svg';
import youtube from 'src/assets/images/youtube.svg';
import styles from './index.module.scss';
import { client } from '~/lib/client';
import ModalMenu from '@/components/ModalMenu';
const Header = ({ setPosts, setTotalPosts, setModalVisible, searchVisible = true }) => {
  const [inputText, setInputText] = useState('');
  const [inputVisible, setInputVisible] = useState(false);

  const handleClickButton = async () => {
    const query = `{
      "searchPosts": *[_type=="post" && (pt::text(body) match "${inputText}") || title match "${inputText}" || description match "${inputText}"] {_id, publishedAt, title, slug, description, mainImage, "categories": categories[]->{title}}
      }`;
    const { searchPosts } = await client.fetch(query);
    console.log(searchPosts);
    setPosts(searchPosts);
    setInputText('');
    setTotalPosts(0);
  }

  const handleClickClose = () => {
    setInputText('');
    setInputVisible(false);
  }

  return (
    <nav className={styles.header}>
      <div className={styles.header__logo}>
        <Link href={'/'}>
          <a>
            <img src={logo.src} alt='' />
          </a>
        </Link>
      </div>
      {
        inputVisible ?
          <div className={styles.header__inputBlock}>
            <div onClick={handleClickButton} className={styles.header__inputBlock_img}>
              <img src={search.src} />
            </div>
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder='search'
            />
            <div onClick={handleClickClose} className={styles.header__inputBlock_img}>
              <img src={close.src} />
            </div>
          </div> :
          <div className={styles.header__menu}>
            <Link href={'/interviews'}>
              <a>
                Interviews
              </a>
            </Link>
            <Link href={'/skin-care'}>
              <a>
                Skin Care
              </a>
            </Link>
            <Link href={'/culture'}>
              <a>
                Culture
              </a>
            </Link>
            <Link href={'/about'}>
              <a>
                About us
              </a>
            </Link>
          </div>
      }

      <div className={styles.header__icons}>
        {
          searchVisible &&
          <div className={styles.header__iconSearch} onClick={() => setInputVisible(true)}>
            <img src={search.src} alt='' />
          </div>
        }
        <div className={styles.header__iconBurger} onClick={() => setModalVisible(true)}>
          <img src={burger.src} alt='' />
        </div>
        <a href='#' target='_blank'>
          <img src={facebook.src} alt='' />
        </a>
        <a href='#' target='_blank'>
          <img src={twitter.src} alt='' />
        </a>
        <a href='#' target='_blank'>
          <img src={youtube.src} alt='' />
        </a>
      </div>
    </nav>
  )
}

export default Header;
