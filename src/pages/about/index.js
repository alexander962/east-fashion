import React, { useState } from 'react';
import cl from 'classnames'

import aboutImg from '../../assets/images/about-img.png'
import styles from './index.module.scss'
import { Footer, Header, Section, Title } from '@/components';
import ModalMenu from '@/components/ModalMenu';
const About = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div>
      <div className={cl(styles.aboutWrapper, styles.aboutWrapperHeader)}>
        <ModalMenu setModalVisible={setModalVisible} modalVisible={modalVisible} />
        <Header setModalVisible={setModalVisible} searchVisible={false} />
      </div>
      <div className={cl(styles.aboutImg)} style={{backgroundImage: `url(${aboutImg.src})`}}>
        Your perfect guide in beauty industry
      </div>
      <div className={cl(styles.aboutWrapper)}>
        <span className={cl(styles.aboutName)}>About us</span>
        <hr className={cl(styles.aboutHr)} />
        <p className={cl(styles.aboutTitle)}>It’s all about our philosophy and values that we open to share with you.</p>
        <p className={cl(styles.aboutDescription)}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
      </div>
      <div className={cl(styles.aboutWrapper, styles.aboutWrapperFooter)}>
        <Footer subscribe={false} />
      </div>
    </div>
  )
}

export default About;
