import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import { type Blog } from "./blogs";

type User = {
  id: number;
  username: string;
  name: string;
  blogs?: Blog[];
};

export const getAll = async () => {
  return db.query.users.findMany();
};

export const getUserById = async (id: number): Promise<User | undefined> => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  });
};

export const getUserByUsername = async (
  username: string,
): Promise<User | undefined> => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true },
  });
};
