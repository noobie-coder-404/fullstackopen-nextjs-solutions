import { getAll } from "@/app/services/users";
import Link from "next/link";
const Users = async () => {
  const users = await getAll();

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl text-center text-blue-600 uppercase font-bold mb-6">
        Users
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {users.map((user) => (
          <Link
            href={`/users/${user.id}`}
            key={user.id}
            className="block group"
          >
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm group-hover:shadow-md transition-all group-hover:border-blue-300">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {user.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">@{user.username}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Users;
