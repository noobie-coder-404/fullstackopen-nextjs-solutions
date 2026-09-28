import Link from "next/link";
import { getBlogs } from "../services/blogs";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter } = await searchParams;

  const unsortedBlogs = await getBlogs();
  const sortedBlogs = [...unsortedBlogs].sort(
    (a, b) => (b.likes ?? 0) - (a.likes ?? 0),
  );
  const blogs = filter
    ? sortedBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(filter.toLowerCase()),
      )
    : sortedBlogs;

  return (
    <div>
      <form>
        <div>
          <label>Search</label>
          <input type="text" name="filter" />
        </div>
        <button type="submit">search</button>
      </form>
      <h2>Blogs app</h2>
      {blogs.map((blog) => {
        return (
          <div key={blog.id}>
            <h3>
              <Link href={`/blogs/${blog.id}`}>title: {blog.title}</Link>
            </h3>
            <p>author: {blog.author}</p>
            <p>url: {blog.url}</p>
            <p>likes: {blog.likes}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Blogs;
