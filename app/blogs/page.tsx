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
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl text-center text-blue-600 uppercase font-bold">
        Blogs
      </h2>

      <form className="flex items-center gap-2">
        <label htmlFor="filter" className="sr-only">
          Filter
        </label>
        <input
          id="filter"
          data-testid="filter-input"
          type="text"
          name="filter"
          placeholder="Search blogs..."
          className="flex-1 border rounded p-2 bg-transparent"
        />
        <button
          type="submit"
          data-testid="search-button"
          className="border rounded px-4 py-2 hover:bg-gray-100 transition-colors"
        >
          Search
        </button>
      </form>

      <div data-testid="blogs-list" className="space-y-4">
        {blogs.map((blog) => (
          <div
            className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
            key={blog.id}
          >
            <Link href={`/blogs/${blog.id}`}>
              <h3 className="text-xl text-blue-600 hover:text-blue-800 hover:underline font-bold mb-3">
                {blog.title}
              </h3>
            </Link>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-semibold text-gray-800">Author:</span>{" "}
                {blog.author}
              </p>
              <p>
                <span className="font-semibold text-gray-800">URL:</span>{" "}
                <a
                  href={blog.url}
                  className="text-blue-500 hover:underline break-all"
                >
                  {blog.url}
                </a>
              </p>
              <p>
                <span className="font-semibold text-gray-800">Likes:</span>{" "}
                {blog.likes} likes
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
