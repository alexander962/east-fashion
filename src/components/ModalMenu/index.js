import React from 'react'
import cl from 'classnames'

import close from 'src/assets/images/close-big.svg';
import styles from './index.module.scss'
import Link from 'next/link';
import facebook from '@/assets/images/facebook.svg';
import twitter from '@/assets/images/twitter.svg';
import youtube from '@/assets/images/youtube.svg';
const ModalMenu = ({ modalVisible, setModalVisible }) => {
  return (
    <div className={cl(styles.modal, modalVisible && styles.modalActive)}>
      <div>
        <div className={styles.modalMenu}>
          <Link href={'/interviews'} onClick={() => setModalVisible(false)}>
            <a>
              Interviews
            </a>
          </Link>
          <Link href={'/skin-care'} onClick={() => setModalVisible(false)}>
            <a>
              Skin Care
            </a>
          </Link>
          <Link href={'/culture'} onClick={() => setModalVisible(false)}>
            <a>
              Culture
            </a>
          </Link>
          <Link href={'/about'} onClick={() => setModalVisible(false)}>
            <a>
              About us
            </a>
          </Link>
        </div>
        <div className={styles.modalIcons}>
          <span>Get in touch</span>
          <div>
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
        </div>
      </div>
      <div>
        <img src={close.src} onClick={() => setModalVisible(false)}  />
      </div>
    </div>
  )
}

export default ModalMenu;
