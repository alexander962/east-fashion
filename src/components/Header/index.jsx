import React, { useState } from 'react';
import Link from 'next/link';

import logo from 'src/assets/images/logo.png';
import search from 'src/assets/images/search.svg';
import facebook from 'src/assets/images/facebook.svg';
import twitter from 'src/assets/images/twitter.svg';
import youtube from 'src/assets/images/youtube.svg';
import styles from './index.module.scss';
import { client } from '~/lib/client';
const Header = ({setPosts}) => {
  const [inputText, setInputText] = useState('');
  const [inputVisible, setInputVisible] = useState(false);

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
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
            <div onClick={handleClickButton}>
              <img src={search.src} />
            </div>
            <input
              style={{width: '20%', marginRight: '10px'}}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
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
        <div onClick={() => setInputVisible(true)}>
          <img src={search.src} alt='' />
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
