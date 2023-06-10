export function getSuggestedBlogs(currentBlog, count = 2, data) {
  const relatedBlogs = data.filter((blog) => {
    return (
      blog.frontmatter.slug !== currentBlog.frontmatter.slug &&
      blog.frontmatter.category === currentBlog.frontmatter.category &&
      blog.frontmatter.tab === currentBlog.frontmatter.tab &&
      blog.frontmatter.desc === currentBlog.frontmatter.desc
    );
  });

  if (relatedBlogs.length >= count) {
    // Chọn ngẫu nhiên 'count' bài blog liên quan từ danh sách
    const suggestedBlogs = [];
    const indexes = new Set();
    while (indexes.size < count) {
      const randomIndex = Math.floor(Math.random() * relatedBlogs.length);
      const relatedBlog = relatedBlogs[randomIndex];
      if (!indexes.has(randomIndex) && !suggestedBlogs.some((blog) => blog.frontmatter.slug === relatedBlog.frontmatter.slug)) {
        indexes.add(randomIndex);
        suggestedBlogs.push(relatedBlog);
      }
    }

    return suggestedBlogs;
  } else {
    // Lấy các bài blog liên quan khác nếu không đủ số lượng
    const remainingCount = count - relatedBlogs.length;
    const otherBlogs = data.filter((blog) => {
      return (
        blog.frontmatter.slug !== currentBlog.frontmatter.slug &&
        !relatedBlogs.some((relatedBlog) => relatedBlog.frontmatter.slug === blog.frontmatter.slug)
      );
    });
    const suggestedBlogs = [];

    for (let i = 0; i < remainingCount; i++) {
      const randomIndex = Math.floor(Math.random() * otherBlogs.length);
      suggestedBlogs.push(otherBlogs[randomIndex]);
      otherBlogs.splice(randomIndex, 1);
    }

    return suggestedBlogs;
  }
}
