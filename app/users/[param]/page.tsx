import { notFound } from "next/navigation";
import { getUserById, getUserByUsername } from "@/app/services/users";

const User = async ({ params }: { params: Promise<{ param: string }> }) => {
  const { param } = await params;
  const isUsername = isNaN(Number(param));
  let user;
  if (isUsername) {
    user = await getUserByUsername(param);
  } else {
    user = await getUserById(Number(param));
  }

  if (!user) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-3">
      <h2 className="text-2xl text-center text-blue-600 uppercase font-bold mb-4">
        {user.name}
      </h2>
      <p className="border rounded p-3">username: {user.username}</p>
      <p className="border rounded p-3">name: {user.name}</p>

      {isUsername && (
        <div className="pt-4 space-y-3">
          <h3 className="text-xl font-semibold border-b pb-2">Blogs:</h3>
          {user.blogs?.map((blog) => (
            <div key={blog.id} className="border rounded p-3 space-y-1">
              <h4 className="font-bold text-blue-600">{blog.title}</h4>
              <p>author: {blog.author}</p>
              <p>url: {blog.url}</p>
              <p>likes: {blog.likes}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default User;
