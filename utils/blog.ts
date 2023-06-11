import readingTime from 'reading-time';
import MarkdownIt from 'markdown-it';

export const readTime = (htmlSting: string) => {
  const result = readingTime(htmlSting);

  const readingMinutes = Math.ceil(result.minutes);
  const readingTimeVi = readingMinutes > 1 ? `${readingMinutes} phút` : '1 phút';

  return {
    ...result,
    readingTimeVi: readingTimeVi
  };
}

export const convertMarkdownToHTML = (markdown : string) => {
  const md = new MarkdownIt();
  return md.render(markdown);
}