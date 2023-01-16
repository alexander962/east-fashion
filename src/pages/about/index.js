import React, { useState } from 'react';
import cl from 'classnames'

import aboutImg from '../../assets/images/about-img.png'
import styles from './index.module.scss'
import { Footer, Header, Section, Title } from '@/components';
import ModalMenu from '@/components/ModalMenu';
import { loadAboutPage, loadFavouritesPosts, loadPopularPosts, loadPosts } from '@/pages/api/posts';
import { urlFor } from '~/lib/client';
const About = ({aboutInfo}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div>
      <div className={cl(styles.aboutWrapper, styles.aboutWrapperHeader)}>
        <ModalMenu setModalVisible={setModalVisible} modalVisible={modalVisible} />
        <Header setModalVisible={setModalVisible} searchVisible={false} />
      </div>
      <div className={cl(styles.aboutImg)} style={{backgroundImage: `url(${urlFor(aboutInfo.image).url()})`}}>
        {aboutInfo.subtitle}
      </div>
      <div className={cl(styles.aboutWrapper)}>
        <span className={cl(styles.aboutName)}>About us</span>
        <hr className={cl(styles.aboutHr)} />
        <p className={cl(styles.aboutTitle)}>{aboutInfo.title}</p>
        <p className={cl(styles.aboutDescription)}> {aboutInfo.description} </p>
      </div>
      <div className={cl(styles.aboutWrapper, styles.aboutWrapperFooter)}>
        <Footer subscribe={false} />
      </div>
    </div>
  )
}

export default About;

export const getServerSideProps = async () => {
  const { aboutInfo } = await loadAboutPage();

  return {
    props: {
      aboutInfo
    }
  }
}
