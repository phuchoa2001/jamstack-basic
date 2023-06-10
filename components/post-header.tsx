import Avatar from './avatar'
import { Space, Tag } from 'antd';
import moment from 'moment'
import CoverImage from './cover-image'
import PostTitle from './post-title'
import type Author from '../interfaces/author'
import { DATE_DISPLAY_FORMAT } from '../contant/dateFormats'

type Props = {
  title: string
  coverImage: string
  date: string,
  desc: string,
  author: Author,
  tags: string[]
}

const PostHeader = ({ title, coverImage, date, author, desc, tags }: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className='my-2'>
        <Space size={[0, 8]} wrap>
          {tags.map((item) => (
            <Tag>
              {item}
            </Tag>
          ))}
        </Space>
      </div>
      <div className='mb-3'>{desc}</div>
      <div className="hidden md:block md:mb-12">
        <Avatar name={author.name} picture={author.picture} />
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="w-100">
        <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        <div className="mb-6 text-lg">
          {moment(date).format(DATE_DISPLAY_FORMAT)}
        </div>
      </div>
    </>
  )
}

export default PostHeader
