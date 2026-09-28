"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addBlog, changeLikes } from "../services/blogs";

export const createBlog = async (formData: FormData) => {
  const title = formData.get("title");
  const url = formData.get("url");
  const author = formData.get("author");
  if (
    typeof title === "string" &&
    typeof url === "string" &&
    typeof author === "string"
  ) {
    await addBlog({ title, url, author });
  }
  revalidatePath("/blogs");

  redirect("/blogs");
};

export const updateLikes = async (formData: FormData) => {
  const id = formData.get("id");
  if (id) {
    await changeLikes(Number(id));
    revalidatePath("/blogs");
    revalidatePath(`/blogs/${id}`);
  }
};
