import { Space, Tag } from 'antd';
import Avatar from './avatar'
import CoverImage from './cover-image'
import moment from "moment"
import Link from 'next/link'
import type Author from '../interfaces/author'
import { DATE_DISPLAY_FORMAT } from '../contant/dateFormats'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: Author
  slug: string,
  tags: string[]
}

const HeroPost = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  tags
}: Props) => {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} src={coverImage} slug={slug} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
            <Link
              as={`/posts/${slug}`}
              href="/posts/[slug]"
              className="hover:underline"
            >
              {title}
            </Link>
          </h3>
          <div className='my-2'>
            <Space size={[0, 8]} wrap>
              {tags.map((item) => (
                <Tag>
                  {item}
                </Tag>
              ))}
            </Space>
          </div>
          <div className="mb-4 md:mb-0 text-lg">
            {moment(date).format(DATE_DISPLAY_FORMAT)}
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
    </section>
  )
}

export default HeroPost
