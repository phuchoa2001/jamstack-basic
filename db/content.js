import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getData() {
  const contentDir = path.join(process.cwd(), 'content');
  const fileTypes = ['.md'];

  const files = getFilesFromDirectory(contentDir, fileTypes);

  const fileContents = files.map((filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    return {
      frontmatter: data,
      markdownContent: content,
    };
  });

  return fileContents;
}

function getFilesFromDirectory(dir, fileTypes, filesList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Nếu là thư mục, tiếp tục đệ quy vào thư mục con
      getFilesFromDirectory(filePath, fileTypes, filesList);
    } else {
      // Kiểm tra định dạng tệp và thêm vào danh sách
      const extname = path.extname(file);
      if (fileTypes.includes(extname.toLowerCase())) {
        filesList.push(filePath);
      }
    }
  });

  return filesList;
}
