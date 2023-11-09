import React, { useState } from 'react';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-nextjs-toast';

import { client } from '~/lib/client';
import facebook from '@/assets/images/facebook.svg';
import twitter from '@/assets/images/instagram.svg';
import youtube from '@/assets/images/youtube.svg';
import styles from './index.module.scss';
import cl from 'classnames';
import logo from '@/assets/images/logo.svg';
const Footer = ({ classname, subscribe = true, icons = true }) => {
  const [inputText, setInputText] = useState('');

  const handleSignUp = async () => {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(inputText)) {
      toast.notify('Votre inscription est confirmée!', {
        duration: 5,
        title: 'Félicitations!',
        fontFamily: 'GillSans',
        color: '#000',
      });
      try {
        const url =
          'https://script.google.com/macros/s/AKfycbyujzcrUoYWgbN8XSyTREcHxts917QABltBmOLZUjUcehVkq_m3uonqc3xKU4xkgzkIvw/exec';
        fetch(`${url}?email=${inputText}`);
      } catch (err) {
        console.log(err);
      }
      setInputText('');
    } else {
      toast.notify('Entrez une adresse e-mail valable, par exemple: exemple@mail.com', {
        duration: 5,
        title: 'Erreur!',
        fontFamily: 'GillSans',
        color: '#000',
      });
    }
  };

  return (
    <div>
      <ToastContainer align={'right'} position={'bottom'} />
      {subscribe && (
        <div className={cl(classname, styles.footer__form)}>
          <label className={styles.footer__form_text} htmlFor="text">
            Inscrivez-vous pour recevoir des mises à jour par e-mail (y compris des articles sur Kyrill Kazak et des
            invitations à des événements). Vous pouvez vous désabonner à tout moment.
          </label>
          <div className={styles.footer__formBlock}>
            <input
              id="text"
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="VOTRE ADRESSE"
              required
            />
            <button onClick={handleSignUp}>INSCRIVEZ-VOUS</button>
          </div>
        </div>
      )}
      {icons && (
        <>
          <hr className={styles.hr} />
          <footer className={styles.footer}>
            <nav className={styles.footer__nav}>
              <div className={styles.footer__menu}>
                <Link href={'/'}>
                  <a className={styles.footer__logo}>
                    <img src={logo.src} alt="" />
                  </a>
                </Link>
                <Link href={'/soins-de-beaute'}>
                  <a>Soins de Beauté</a>
                </Link>
                <Link href={'/entretiens'}>
                  <a>Entretiens</a>
                </Link>
                <Link href={'/art-et-culture'}>
                  <a>Art &amp; Culture</a>
                </Link>
                <Link href={'/a-propos'}>
                  <a>À Propos</a>
                </Link>
              </div>
              <div className={styles.footer__icons}>
                <a href="https://www.facebook.com/kyrillkazak" target="_blank">
                  <img src={facebook.src} alt="" width="24px" height="24px" />
                </a>
                <a href="#" target="_blank">
                  <img src={twitter.src} alt="" width="24px" height="24px" />
                </a>
                <a href="#" target="_blank">
                  <img src={youtube.src} alt="" width="24px" height="24px" />
                </a>
              </div>
            </nav>
          </footer>
          <hr className={styles.hr} />
        </>
      )}

      {!subscribe && (
        <div className={styles.footerInfo}>
          Vous souhaiter nous joindre? Envoyez nous un e-mail à l’adresse{' '}
          <a href="mailto:info@kyrillkazak.com">info@kyrillkazak.com</a>
        </div>
      )}
    </div>
  );
};

export default Footer;
