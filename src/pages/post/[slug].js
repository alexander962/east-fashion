import React from 'react'
import cl from 'classnames'

import { client } from '~/lib/client'
import styles from './index.module.scss';
import {Article, Content, Footer, Header, Section, Title} from "@/components";
import {format} from "date-fns";
const PostInfo = ({ className, post }) => {
  const date = format(new Date(post.publishedAt), 'dd MMM yyyy')

  return (
    <>
      <Header />
      <Section>
        <Article backUrl="/">
          <Title>{post.title}</Title>
          <p>{date}</p>
          <Content body={post.body} />
        </Article>
      </Section>
      <Section>
        <Footer />
      </Section>
    </>
  )
}

export default PostInfo;

export async function getStaticPaths() {
  const query = `*[type == "post"] {
    slug {
      current
    }
  }`;

  const posts = await client.fetch(query);
  const paths = posts.map(post => ({
    params: {
      slug: post.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params: {slug} }) {
  const query = `*[_type == "post" && slug.current == '${slug}'][0]`

  const post = await client.fetch(query);

  return {
    props: {
      post
    }
  }
}
