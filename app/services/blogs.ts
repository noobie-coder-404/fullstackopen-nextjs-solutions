type Blog = {
  id?: number;
  title: string;
  author: string;
  url: string;
  likes?: number;
};

const blogs = [
  {
    id: 1,
    title: "blog 1",
    author: "blogger 1",
    url: "blog1.com",
    likes: 1,
  },
  {
    id: 2,
    title: "blog 2",
    author: "blogger 2",
    url: "blog2.com",
    likes: 2,
  },
];

export const getBlogs = (): Blog[] => blogs;
export const addBlog = (blog: Blog) => {
  blogs.push({
    ...blog,
    id: blogs.length + 1,
    likes: blog.likes ?? 0,
  });
};

export const getBlogById = (id: number): Blog | undefined => {
  return blogs.find((blog) => blog.id === id);
};

export const changeLikes = (id: number): void => {
  const blog = blogs.find((blog) => blog.id === id);
  if (blog && blog.likes !== undefined) {
    blog.likes++;
  }
};
