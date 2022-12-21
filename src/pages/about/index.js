import React from 'react'
import cl from 'classnames'

import styles from './index.module.scss'
import { Footer, Header, Section } from '@/components';
const About = ({className, children}) => {
  return (
    <section className={cl(className)}>
      <Header />
      <Section>
        About
      </Section>
      <Section>
        <Footer />
      </Section>
    </section>
  )
}

export default About;
