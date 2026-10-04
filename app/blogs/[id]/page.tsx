import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs";
import { updateLikes, addToReadingList } from "../../actions/blogs";
import { auth } from "@/auth";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));
  const session = await auth();
  const username = session?.user?.email;
  if (!blog) {
    notFound();
  }

  return (
    <div data-testid="blog-detail" className="max-w-2xl mx-auto p-6 space-y-3">
      <h2
        data-testid="blog-title"
        className="text-2xl text-center text-blue-600 uppercase font-bold mb-4"
      >
        {blog.title}
      </h2>
      <p data-testid="blog-author" className="border rounded p-3">
        author: {blog.author}
      </p>
      <p className="border rounded p-3">url: {blog.url}</p>
      <p data-testid="blog-likes" className="border rounded p-3">
        likes: {blog.likes}
      </p>
      <form action={updateLikes} className="pt-2">
        <input type="hidden" name="id" value={blog.id} />
        <button
          type="submit"
          data-testid="like-button"
          className="w-full border-2 border-blue-600 text-blue-600 font-bold rounded px-4 py-2 hover:bg-blue-50 transition-colors shadow-sm"
        >
          Like ❤️
        </button>
      </form>
      {username && (
        <form action={addToReadingList} className="pt-2">
          <input type="hidden" name="blogId" value={blog.id} />
          <input type="hidden" name="username" value={username} />
          <button
            type="submit"
            data-testid="add-to-reading-list-button"
            className="w-full bg-blue-600 text-white font-bold rounded px-4 py-2 hover:bg-blue-700 transition-colors shadow-sm"
          >
            Add to Reading List
          </button>
        </form>
      )}
    </div>
  );
};

export default BlogPage;
