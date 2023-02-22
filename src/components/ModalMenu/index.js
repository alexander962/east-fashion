import React from 'react';
import cl from 'classnames';
import Link from 'next/link';

import styles from './index.module.scss';
import facebook from '@/assets/images/facebook.svg';
import twitter from '@/assets/images/instagram.svg';
import youtube from '@/assets/images/youtube.svg';
import close from 'src/assets/images/close-big.svg';
import logo from '@/assets/images/logo.svg';

const ModalMenu = ({ modalVisible, setModalVisible }) => {
  return (
    <div className={cl(styles.modal, modalVisible && styles.modalActive)}>
      <div className={styles.modalMenu}>
        <Link href={'/'}>
          <a onClick={() => setModalVisible(false)}>
            <img src={logo.src} alt="" />
          </a>
        </Link>
        <div className={styles.modalMenuBlock}>
          <Link href={'/skin-care'}>
            <a onClick={() => setModalVisible(false)}>Soins de Beauté</a>
          </Link>
          <Link href={'/interviews'}>
            <a onClick={() => setModalVisible(false)}>Entretiens</a>
          </Link>
          <Link href={'/culture'}>
            <a onClick={() => setModalVisible(false)}>Art &amp; Culture</a>
          </Link>
          <Link href={'/about'}>
            <a onClick={() => setModalVisible(false)}>A Propos</a>
          </Link>
        </div>
        <div className={styles.modalIcons}>
          <span>Suivez-nous</span>
          <div>
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
        </div>
        <div className={styles.modalClose}>
          <img src={close.src} onClick={() => setModalVisible(false)} alt="" />
        </div>
      </div>
    </div>
  );
};
export default ModalMenu;
