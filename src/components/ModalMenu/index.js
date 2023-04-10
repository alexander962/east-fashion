import React, { useEffect, useRef } from 'react';
import cl from 'classnames';
import Link from 'next/link';

import styles from './index.module.scss';
import facebook from '@/assets/images/facebook.svg';
import twitter from '@/assets/images/instagram.svg';
import youtube from '@/assets/images/youtube.svg';
import close from 'src/assets/images/close-big.svg';
import logo from '@/assets/images/logo.svg';

const ModalMenu = ({ modalVisible, setModalVisible }) => {
  const modalMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (modalMenuRef.current && !modalMenuRef.current.contains(event.target)) {
        setModalVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalMenuRef, setModalVisible]);

  return (
    <div className={cl(styles.modal, modalVisible && styles.modalActive)}>
      <div ref={modalMenuRef} className={styles.modalMenu}>
        <Link href={'/'}>
          <a onClick={() => setModalVisible(false)} className={styles.modalMenuLogo}>
            <img src={logo.src} alt="" />
          </a>
        </Link>
        <div className={styles.modalMenuBlock}>
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
        </div>
        <div className={styles.modalIcons}>
          <span>Suivez-nous</span>
          <div>
            <a href="https://www.facebook.com/kyrillkazak" target="_blank">
              <img src={facebook.src} alt="" />
            </a>
            <a href="#" target="_blank">
              <img src={twitter.src} alt="" />
            </a>
            <a href="#" target="_blank">
              <img src={youtube.src} alt="" />
            </a>
          </div>
        </div>
        <div className={styles.modalClose}>
          <img src={close.src} onClick={() => setModalVisible(false)} alt="" />
        </div>
      </div>
    </div>
  );
};
export default ModalMenu;
