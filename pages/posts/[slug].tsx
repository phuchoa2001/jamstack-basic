import axios from 'axios';

import { useRouter } from 'next/router'
import { getItemBySlug, getData } from '../../db/content';
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import { linkAvatar } from '../../contant/userName';
import PostSuggestion from '../../components/PostSuggestion';
import HeaderSeo from '../../components/HeaderSeo';

type Props = {
  post: any
  currentBlog: any
}

export default function Post({ post, currentBlog }: Props) {
  const blog = JSON.parse(post);
  const router = useRouter()
  if (!router.isFallback && !blog?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout isMeta={false} >
      <Head>
        <HeaderSeo
          title={blog?.title}
          image={blog?.image}
          desc={blog?.desc}
        />
      </Head>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <PostHeader
                title={blog.title}
                coverImage={blog.image}
                date={blog.date}
                desc={blog.desc}
                tags={blog.tags}
                author={{
                  name: blog.author,
                  picture: linkAvatar
                }}
              />
              <PostBody content={blog.markdownContent} />
              {/* <PostSuggestion post={JSON.parse(currentBlog)} /> */}
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = getItemBySlug(params.slug);
  return {
    props: {
      post: JSON.stringify({
        ...post,
        ...post?.frontmatter,
      }),
      currentBlog: JSON.stringify(post)
    },
  }
}

export async function getStaticPaths() {
  const data = getData();

  return {
    paths: data.map((post) => {
      return {
        params: {
          slug: post.frontmatter.slug,
        },
      }
    }),
    fallback: false,
  }
}
