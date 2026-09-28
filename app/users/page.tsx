import { getAll } from "@/app/services/users";
import Link from "next/link";
const Users = async () => {
  const users = await getAll();

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <Link href={`/users/${user.id}`}>
            <h2>{user.name}</h2>
          </Link>
          <p> username: {user.username}</p>
          <p>name: {user.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Users;
