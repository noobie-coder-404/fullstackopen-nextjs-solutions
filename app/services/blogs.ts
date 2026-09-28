import { eq } from "drizzle-orm";
import { db } from "../../db";
import { blogs } from "../../db/schema";

export type Blog = {
  id: number;
  title: string;
  author: string;
  url: string;
  likes: number;
};

// const blogs = [
//   {
//     id: 1,
//     title: "blog 1",
//     author: "blogger 1",
//     url: "blog1.com",
//     likes: 1,
//   },
//   {
//     id: 2,
//     title: "blog 2",
//     author: "blogger 2",
//     url: "blog2.com",
//     likes: 2,
//   },
// ];

export const getBlogs = async (): Promise<Blog[]> => db.query.blogs.findMany();
export const addBlog = async (
  blog: Omit<Blog, "likes" | "id">,
): Promise<void> => {
  await db.insert(blogs).values(blog);
  // blogs.push({
  //   ...blog,
  //   id: blogs.length + 1,
  //   likes: blog.likes ?? 0,
  // });
};

export const getBlogById = async (id: number): Promise<Blog | undefined> => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  });
  // return blogs.find((blog) => blog.id === id);
  // return undefined;
};

export const changeLikes = async (id: number): Promise<void> => {
  const blog = await getBlogById(id);
  if (blog) {
    await db
      .update(blogs)
      .set({ likes: blog.likes + 1 })
      .where(eq(blogs.id, blog.id));
  }
  // const blog = blogs.find((blog) => blog.id === id);
  // if (blog && blog.likes !== undefined) {
  //   blog.likes++;
  // }
};
