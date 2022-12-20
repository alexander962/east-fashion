import React from 'react'
import cl from 'classnames'

import styles from './index.module.scss'
import {Footer, Header, Section} from "@/components";
const PostInfo = ({className}) => {
  return (
    <>
      <Header />
      <Section>
        Post
      </Section>
      <Section>
        <Footer />
      </Section>
    </>
  )
}

export default PostInfo;
