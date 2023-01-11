import React, { useState } from 'react';
import cl from 'classnames'

import styles from './index.module.scss'
import { Section } from '@/components';
import Link from 'next/link';
import { AiOutlineSearch } from 'react-icons/ai';
import facebook from '@/assets/images/facebook.svg';
import twitter from '@/assets/images/twitter.svg';
import youtube from '@/assets/images/youtube.svg';
import { client } from '~/lib/client';
const Footer = () => {
  const [inputText, setInputText] = useState('');

  const handleSignUp = () => {
    // console.log('valera');
    // const id = 'd674cb9c-e335-4f31-a3b4-49a4ee894de0';
    // const newpatch = client
    //   .patch(id, {"set": {'description': 'generated Valera'}})

    if (window) {
      window.scrollTo(0, 0);
    }
    const mutations = [
      {
        patch: {
          id: "d674cb9c-e335-4f31-a3b4-49a4ee894de0",
          set: {
            'description':
              "Emails",
          },
        },
      },
      {
        create: {
          '_type': 'emails',
          title: inputText,
        }
      }
    ]

    client.mutate(mutations[1]);
  }

  return (
    <div>
      <form className={styles.footer__form}>
        <label className={styles.footer__form_text} htmlFor="text">Sign up for news delivered right to your inbox.
          Unsubscribe anytime.</label>
        <div className={styles.footer__formBlock}>
          <input
            id="text"
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder='YOUR EMAIL ADDRESS'
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
          <button onClick={handleSignUp}>SIGN UP</button>
        </div>
      </form>
      <hr className={styles.hr} />
      <footer className={styles.footer}>
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
      </footer>
      <hr className={styles.hr} />
    </div>
  )
}

export default Footer;
