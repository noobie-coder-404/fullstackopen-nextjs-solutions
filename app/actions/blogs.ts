"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addBlog, changeLikes } from "../services/blogs";
import { users, blogs, readingList } from "@/db/schema";
import { db } from "@/db";
import { auth } from "@/auth";
import { eq, and } from "drizzle-orm";
type fields = {
  url?: string;
  title?: string;
  author?: string;
};
export const createBlog = async (
  prevState: { errors: fields; values: fields },
  formData: FormData,
) => {
  const title = formData.get("title");
  const url = formData.get("url");
  const author = formData.get("author");
  if (
    typeof title !== "string" ||
    typeof url !== "string" ||
    typeof author !== "string"
  ) {
    throw new Error("Invalid input");
  }
  const values: fields = {};
  const errors: fields = {};
  if (title.length > 0 && title.length < 5) {
    values.title = title;
    errors.title = "Title must be 5 or more characters long";
  } else if (title.length === 0) {
    errors.title = "Title is required";
  } else values.title = title;
  if (url.length > 0 && url.length < 5) {
    values.url = url;
    errors.url = "Url must be 5 or more characters long";
  } else if (url.length === 0) {
    errors.url = "Url is required";
  } else values.url = url;
  if (author.length > 0 && author.length < 5) {
    values.author = author;
    errors.author = "Author must be 5 or more characters long";
  } else if (author.length === 0) {
    errors.author = "Author is required";
  } else {
    values.author = author;
  }

  if (Object.keys(errors).length > 0)
    return {
      errors,
      values,
      success: false,
    };

  await addBlog({ title, url, author });

  revalidatePath("/blogs");

  return {
    errors: {},
    values: {},
    success: true,
  };
  // redirect("/blogs");
};

export const updateLikes = async (formData: FormData) => {
  const id = formData.get("id");
  if (id) {
    await changeLikes(Number(id));
    revalidatePath("/blogs");
    revalidatePath(`/blogs/${id}`);
  }
};

export const addToReadingList = async (formData: FormData) => {
  const blogId = formData.get("blogId");
  if (!blogId || isNaN(Number(blogId))) throw new Error("blog id error");
  const blog = await db.query.blogs.findFirst({
    where: eq(blogs.id, Number(blogId)),
  });
  if (!blog) throw new Error("blog not found");
  const username = formData.get("username");
  if (!username || typeof username !== "string")
    throw new Error("username error");
  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  });
  const userId = user?.id;
  if (!userId) throw new Error("user not found");
  await db.insert(readingList).values({
    userId,
    blogId: Number(blogId),
  });
};

export const markAsRead = async (formData: FormData) => {
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    throw new Error("Unauthorized");
  }
  const blogId = formData.get("blogId");
  if (!blogId || isNaN(Number(blogId))) throw new Error("blog id error");
  const blog = await db.query.blogs.findFirst({
    where: eq(blogs.id, Number(blogId)),
  });
  if (!blog) throw new Error("blog not found");
  const username = session.user.email;

  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  });
  const userId = user?.id;
  if (!userId) throw new Error("user not found");
  const rowsUpdated = await db
    .update(readingList)
    .set({ read: true })
    .where(
      and(
        eq(readingList.userId, userId),
        eq(readingList.blogId, Number(blogId)),
      ),
    )
    .returning();
  if (rowsUpdated.length !== 1) {
    throw new Error("couldn't uniquely identify the blog in reading list ");
  }
  revalidatePath("/me");
};
