export function getSuggestedBlogs(currentBlog, count = 2, data) {
  const relatedBlogs = data.filter((blog) => {
    return (
      blog.frontmatter.slug !== currentBlog.frontmatter.slug &&
      blog.frontmatter.category === currentBlog.frontmatter.category
    );
  });

  const tagCounts = {};
  currentBlog.frontmatter.tags.forEach((tag) => {
    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
  });

  relatedBlogs.sort((blogA, blogB) => {
    const blogATagCount = blogA.frontmatter.tags.reduce((count, tag) => {
      return count + (tagCounts[tag] || 0);
    }, 0);

    const blogBTagCount = blogB.frontmatter.tags.reduce((count, tag) => {
      return count + (tagCounts[tag] || 0);
    }, 0);

    // Sắp xếp theo số lượng tag giống nhau giảm dần
    if (blogATagCount > blogBTagCount) {
      return -1;
    } else if (blogATagCount < blogBTagCount) {
      return 1;
    }

    return 0;
  });

  const suggestedBlogs = [];
  const addedTags = new Set();

  for (let i = 0; i < relatedBlogs.length; i++) {
    const blog = relatedBlogs[i];
    const commonTags = blog.frontmatter.tags.filter((tag) => addedTags.has(tag));

    // Chỉ thêm bài blog nếu có ít nhất một tag chung với bài blog hiện tại
    if (commonTags.length > 0) {
      suggestedBlogs.push(blog);
      addedTags.add(...commonTags);

      if (suggestedBlogs.length === count) {
        break;
      }
    }
  }

  // Nếu số lượng bài blog liên quan chưa đạt đủ, lấy các bài blog khác
  if (suggestedBlogs.length < count) {
    const remainingCount = count - suggestedBlogs.length;
    const otherBlogs = relatedBlogs.filter((blog) => !suggestedBlogs.includes(blog));

    for (let i = 0; i < remainingCount && i < otherBlogs.length; i++) {
      suggestedBlogs.push(otherBlogs[i]);
    }
  }

  return suggestedBlogs;
}
