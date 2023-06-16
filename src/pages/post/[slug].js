import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { client, urlFor } from '~/lib/client';
import { Footer, Header, Section } from '@/components';
import CardPostInfo from '@/components/CardPostInfo';
import ModalMenu from '@/components/ModalMenu';
import { loadPopularPosts, loadSideBarPosts } from '@/pages/api/posts';
const PostInfo = ({ post, popularPosts, sideBarPosts }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [visiblePopularsPosts, setVisiblePopularsPosts] = useState(true);
  const [visibleSearchResult, setVisibleSearchResult] = useState(false);
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

        {post && (
          <>
            <meta property="og:image" content={urlFor(post?.mainImage).url()} />
            <meta name="twitter:image" content={urlFor(post?.mainImage).url()} />
          </>
        )}
      </Head>
      <ModalMenu setModalVisible={setModalVisible} modalVisible={modalVisible} />
      <Header
        setModalVisible={setModalVisible}
        setPosts={setPosts}
        setVisiblePopularsPosts={setVisiblePopularsPosts}
        setTotalPosts={setTotalPosts}
        setVisibleSearchResult={setVisibleSearchResult}
      />
      {post && (
        <CardPostInfo
          post={post}
          popularPosts={popularPosts}
          sideBarPosts={sideBarPosts}
          visibleSearchResult={visibleSearchResult}
          posts={posts}
        />
      )}
      <Footer subscribe={false} />
    </Section>
  );
};

export default PostInfo;

export async function getStaticPaths() {
  const query = `*[type == "post"]{_id, slug { current }, publishedAt, body, title, description, displayTypes, mainImage, additionalImage, thirdImage, video, meta_title, categories, "tags": tags->{title}, comments, sliderImages, "author": author->{name, image}}`;

  const posts = await client.fetch(query);
  const paths = posts.map(post => ({
    params: {
      slug: post?.slug?.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps(props) {
  const {
    params: { slug },
  } = props;
  const query = `*[_type == "post" && slug.current == "${slug}"]{_id, publishedAt, body, title, slug, description, displayTypes, mainImage, additionalImage, thirdImage, video, meta_title, categories, "tags": tags->{title}, comments, sliderImages, "author": author->{name, image}}[0]`;

  const post = await client.fetch(query);
  const { popularPosts } = await loadPopularPosts();
  const { sideBarPosts } = await loadSideBarPosts();

  return {
    props: {
      post,
      popularPosts,
      sideBarPosts,
    },
    revalidate: 1,
  };
}
