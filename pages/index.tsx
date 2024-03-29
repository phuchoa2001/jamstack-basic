
import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Layout from '../components/layout'
import { getData } from '../db/content'
import { linkAvatar } from '../contant/userName'

type Props = {
  data: string
}

export default function Index({ data }: Props) {

  const allPosts = JSON.parse(data);

  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  if (allPosts.length === 0) {
    return <div style={{ width: 1200, margin: "auto", height: "50px", paddingTop: 10 }}>
      Không có dữ liệu
    </div>
  }

  return (
    <>
      <Layout>
        <Container>
          {heroPost && (
            <HeroPost
              title={heroPost.frontmatter.title}
              coverImage={heroPost.frontmatter.image}
              date={heroPost.frontmatter.date}
              author={{
                name: heroPost.frontmatter.author,
                picture: linkAvatar
              }}
              content={heroPost.markdownContent}
              tags={heroPost.frontmatter.tags}
              slug={"/" + heroPost.frontmatter.slug}
              excerpt={heroPost.frontmatter.desc}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const data = JSON.stringify(getData()) || [];

  return {
    props: { data: data },
  }
}
