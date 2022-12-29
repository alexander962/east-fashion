import React from 'react'
import cl from 'classnames'

import styles from './index.module.scss'
import { Footer, Header, Section } from '@/components';
const About = ({children}) => {
  return (
    <Section>
      <Header />
        About
      <Footer />
    </Section>
  )
}

export default About;
