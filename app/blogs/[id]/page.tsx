import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs";
import { updateLikes } from "../../actions/blogs";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = getBlogById(Number(id));
  if (!blog) {
    notFound();
  }

  return (
    <div>
      <h3>title: {blog.title}</h3>
      <p>author: {blog.author}</p>
      <p>url: {blog.url}</p>
      <p> likes: {blog.likes}</p>
      <form action={updateLikes}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit"> like </button>
      </form>
    </div>
  );
};

export default BlogPage;
