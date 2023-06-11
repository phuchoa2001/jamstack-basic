import markdownStyles from './markdown-styles.module.css'
import MarkdownIt from 'markdown-it';

// Hàm chuyển đổi Markdown thành HTML
function convertMarkdownToHTML(markdown) {
  const md = new MarkdownIt();
  return md.render(markdown);
}

type Props = {
  content: string
}

const PostBody = ({ content }: Props) => {
  const htmlContent = convertMarkdownToHTML(content);
  return (
    <div className="w-100 pb-4">
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  )
}

export default PostBody
