import React from 'react';
import Link from 'next/link';

import logo from 'src/assets/images/logo.png';
import search from 'src/assets/images/search.svg';
import facebook from 'src/assets/images/facebook.svg';
import twitter from 'src/assets/images/twitter.svg';
import youtube from 'src/assets/images/youtube.svg'
import styles from './index.module.scss';
const Header = (props) => {

  return (
    <nav className={styles.header}>
      <div className={styles.header__logo}>
        <Link href={'/'}>
          <a>
            <img src={logo.src} alt='' />
          </a>
        </Link>
      </div>
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
      <div className={styles.header__icons}>
        <a href='#' target='_blank'>
          <img src={search.src} alt='' />
        </a>
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
