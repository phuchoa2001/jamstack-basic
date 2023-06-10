import PostPreview from './post-preview'
import { linkAvatar } from '../contant/userName'

type Props = {
  posts: any[]
}

const MoreStories = ({ posts }: Props) => {

  return (
    <section>
      <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        Danh sách bài viết
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => {

          if (!post) {
            return <></>
          }

          return (
            <PostPreview
              key={post.slug}
              title={post.frontmatter.title}
              coverImage={post.frontmatter.image}
              date={post.date}
              tags={post.frontmatter.tags}
              author={{
                name: post.frontmatter.author,
                picture: linkAvatar
              }}
              slug={"/" + post.frontmatter.slug}
              excerpt={post.frontmatter.desc}
            />
          )
        })}
      </div>
    </section>
  )
}

export default MoreStories
