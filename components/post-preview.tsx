import { Space, Tag } from 'antd';
import Avatar from './avatar'
import moment from 'moment'
import CoverImage from './cover-image'
import Link from 'next/link'
import type Author from '../interfaces/author'
import { DATE_DISPLAY_FORMAT } from '../contant/dateFormats'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: Author
  slug: string
  tags: string[]
}

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  slug,
  tags
}: Props) => {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
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
          {tags.map((item , index) => (
            <Tag key={index}>
              {item}
            </Tag>
          ))}
        </Space>
      </div>
      <div className="text-lg mb-4">
        {moment(date).format(DATE_DISPLAY_FORMAT)}
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
    </div>
  )
}

export default PostPreview
