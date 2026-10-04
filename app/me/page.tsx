import { auth } from "@/auth";
import { generateToken, getToken, getReadingList } from "@/app/actions/users";
import { markAsRead } from "@/app/actions/blogs";

import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  // 1. Fetch data directly on the server
  const username = session.user.email;
  const token = await getToken(username);
  const userReadingList = await getReadingList();

  const unreadBlogs = userReadingList.filter((item) => !item.read);
  const readBlogs = userReadingList.filter((item) => item.read);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl text-center text-blue-600 uppercase font-bold mb-4">
        My Profile
      </h2>

      <div data-testid="user-profile" className="space-y-2">
        <p data-testid="user-name" className="border rounded p-3">
          Name: {session.user.name}
        </p>
        <p data-testid="user-username" className="border rounded p-3">
          Username: {username}
        </p>
      </div>

      <div data-testid="api-token-section" className="mt-8 border-t pt-4">
        <h3 className="text-xl text-blue-600 font-bold mb-4">API Token</h3>
        {token ? (
          <div data-testid="token-display">
            <p
              data-testid="api-token"
              className="font-mono bg-gray-100 p-2 rounded break-all"
            >
              {token}
            </p>
          </div>
        ) : (
          <p
            data-testid="no-token-message"
            className="text-gray-500 italic mb-2"
          >
            You don&apos;t have an API token yet.
          </p>
        )}
        <form action={generateToken}>
          <button
            type="submit"
            data-testid="generate-token-button"
            className="w-full border rounded px-4 py-2 hover:bg-gray-100 transition-colors mt-2 font-bold"
          >
            {token ? "Regenerate Token" : "Create Token"}
          </button>
        </form>
      </div>

      <div data-testid="reading-list-section" className="mt-8 border-t pt-4">
        <h3 className="text-xl text-blue-600 font-bold mb-4">
          My Reading List
        </h3>

        {userReadingList.length === 0 ? (
          <p data-testid="empty-reading-list" className="text-gray-500 italic">
            Your reading list is empty.
          </p>
        ) : (
          <div className="space-y-6">
            <div data-testid="unread-section" className="space-y-4">
              <h4 className="font-semibold text-lg text-yellow-700 border-b pb-1">
                Unread
              </h4>
              {unreadBlogs.length > 0 ? (
                unreadBlogs.map((item) => (
                  <div
                    key={item.id}
                    className="border border-yellow-200 bg-yellow-50 rounded p-4 shadow-sm"
                  >
                    <h5 className="font-bold text-lg">{item.blog.title}</h5>
                    <div className="text-sm text-gray-600 mt-1 space-y-1">
                      <p>
                        <span className="font-semibold">Author:</span>{" "}
                        {item.blog.author}
                      </p>
                      <p>
                        <span className="font-semibold">URL:</span>{" "}
                        <a
                          href={item.blog.url}
                          className="text-blue-500 hover:underline"
                        >
                          {item.blog.url}
                        </a>
                      </p>
                    </div>
                    <form action={markAsRead} className="pt-3">
                      <input type="hidden" name="blogId" value={item.blog.id} />
                      <button
                        type="submit"
                        data-testid={`mark-read-${item.id}`}
                        className="w-full bg-green-600 text-white font-bold rounded px-4 py-2 hover:bg-green-700 transition-colors shadow-sm"
                      >
                        Mark as Read
                      </button>
                    </form>
                  </div>
                ))
              ) : (
                <p
                  data-testid="no-unread-blogs"
                  className="text-gray-500 italic"
                >
                  No unread blogs
                </p>
              )}
            </div>

            {readBlogs.length > 0 && (
              <div data-testid="read-section" className="space-y-4">
                <h4 className="font-semibold text-lg text-green-700 border-b pb-1">
                  Read
                </h4>
                {readBlogs.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 bg-gray-50 rounded p-4 shadow-sm opacity-75"
                  >
                    <h5 className="font-bold text-lg">{item.blog.title}</h5>
                    <div className="text-sm text-gray-600 mt-1 space-y-1">
                      <p>
                        <span className="font-semibold">Author:</span>{" "}
                        {item.blog.author}
                      </p>
                      <p>
                        <span className="font-semibold">URL:</span>{" "}
                        <a
                          href={item.blog.url}
                          className="text-blue-500 hover:underline"
                        >
                          {item.blog.url}
                        </a>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
