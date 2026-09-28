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
    <div>
      <h2>{user.name}</h2>
      <p>username: {user.username}</p>
      <p>name: {user.name}</p>
      <h3>Blogs:</h3>
      {isUsername &&
        user.blogs?.map((blog) => (
          <div key={blog.id}>
            <h4>{blog.title}</h4>
            <p>title: {blog.title}</p>
            <p> author: {blog.author}</p>
            <p> url: {blog.url}</p>
            <p> likes: {blog.likes}</p>
          </div>
        ))}
    </div>
  );
};

export default User;
