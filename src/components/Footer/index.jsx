import React, { useState } from 'react';
import cl from 'classnames'

import styles from './index.module.scss'
import { Section } from '@/components';
import Link from 'next/link';
import { AiOutlineSearch } from 'react-icons/ai';
import facebook from '@/assets/images/facebook.svg';
import twitter from '@/assets/images/twitter.svg';
import youtube from '@/assets/images/youtube.svg';
const Footer = () => {
  const [inputText, setInputText] = useState('');
  return (
    <div>
      <form className={styles.footer__form}>
        <label className={styles.footer__form_text} htmlFor="text">Sign up for news delivered right to your inbox.
          Unsubscribe anytime.</label>
        <div className={styles.footer__formBlock}>
          <input
            id="text"
            type="text"
            onChange={e => setInputText(e.target.value)}
            placeholder='YOUR EMAIL ADDRESS'
          />
          <button type="submit">SIGN UP</button>
        </div>
      </form>
      <hr className={styles.hr} />
      <div className={styles.footer}>
        <nav className={styles.footer__nav}>
          <div className={styles.footer__menu}>
            <Link href={'/interviews'}>
              <a>
                Interviews
              </a>
            </Link>
            <Link href={'/skin-care'}>
              <a>
                Skincare
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
          <div className={styles.footer__icons}>
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
      </div>
      <hr className={styles.hr} />
    </div>
  )
}

export default Footer;
