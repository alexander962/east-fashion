import React from 'react';
import cl from 'classnames';
import Link from 'next/link';

import styles from './index.module.scss';
import facebook from '@/assets/images/facebook.svg';
import twitter from '@/assets/images/instagram.svg';
import youtube from '@/assets/images/youtube.svg';
import close from 'src/assets/images/close-big.svg';

const ModalMenu = ({ modalVisible, setModalVisible }) => {
  return (
    <div className={cl(styles.modal, modalVisible && styles.modalActive)}>
      <div className={styles.modalMenu}>
        <div className={styles.modalMenuBlock}>
          <Link href={'/interviews'}>
            <a onClick={() => setModalVisible(false)}>Interviews</a>
          </Link>
          <Link href={'/skin-care'}>
            <a onClick={() => setModalVisible(false)}>Skin Care</a>
          </Link>
          <Link href={'/culture'}>
            <a onClick={() => setModalVisible(false)}>Culture</a>
          </Link>
          <Link href={'/about'}>
            <a onClick={() => setModalVisible(false)}>About us</a>
          </Link>
        </div>
        <div className={styles.modalIcons}>
          <span>Get in touch</span>
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
      </div>
      <div>
        <img src={close.src} onClick={() => setModalVisible(false)} alt="" />
      </div>
    </div>
  );
};
export default ModalMenu;
