import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { client } from '~/lib/client'

import { Footer, Header, Section } from "@/components";
import Head from "next/head";
import CardPostInfo from '@/components/CardPostInfo';
import ModalMenu from '@/components/ModalMenu';
const PostInfo = ({ post }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [visiblePopularsPosts, setVisiblePopularsPosts] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!post) {
      router.push('/404');
    }
  }, [post]);

  return (
    <Section>
      <Head>
        <title>{post?.meta_title}</title>
      </Head>
      <ModalMenu setModalVisible={setModalVisible} modalVisible={modalVisible} />
      <Header searchVisible={false} setModalVisible={setModalVisible} setPosts={setPosts} setVisiblePopularsPosts={setVisiblePopularsPosts} setTotalPosts={setTotalPosts} />
      {
        post && <CardPostInfo post={post} />
      }
      <Footer />
    </Section>
  )
}

export default PostInfo;

export async function getStaticPaths() {
  // const query = `*[type == "post"] {
  //   slug {
  //     current
  //   }
  // }`;
  const query = `*[type == "post"]{_id, slug { current }, publishedAt, body, title, description, mainImage, additionalImage, meta_title, "categories": categories->{title}, comments, sliderImages, "author": author->{name, image}}`;

  const posts = await client.fetch(query);
  const paths = posts.map(post => ({
    params: {
      slug: post?.slug?.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps(props) {
  console.log(props);
  const { params: {slug} } = props;
  const query = `*[_type == "post" && slug.current == '${slug}']{_id, publishedAt, body, title, slug, description, mainImage, additionalImage, meta_title, "categories": categories->{title}, comments, sliderImages, "author": author->{name, image}}[0]`

  const post = await client.fetch(query);

  return {
    props: {
      post,
    },
    revalidate: 1,
  }
}
