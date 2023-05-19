
import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Layout from '../components/layout'
import Post from '../interfaces/post'
import { getData } from '../db/content'

type Props = {
  allPosts: Post[],
  data : any[]
}

export default function Index({ allPosts , data }: Props) {
  console.log("data" , data);

  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
      <Layout>
        <Container>
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={{
                name: "JJ Kasper",
                picture: "/assets/blog/authors/jj.jpeg"
              }}
              slug={"/" + heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const res = await fetch("https://633fac66d1fcddf69ca7402e.mockapi.io/blog");
  const allPosts = await res.json();
  const data = getData();
  
  return {
    props: { allPosts , data },
  }
}
