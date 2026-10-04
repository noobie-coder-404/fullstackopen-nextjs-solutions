"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users, readingList } from "@/db/schema";
type fields = {
  name?: string;
  username?: string;
  password?: string;
  passwordConfirm?: string;
};
export const registerUser = async (
  prevState: { errors: fields; values: fields },
  formData: FormData,
) => {
  const username = formData.get("username");
  const password = formData.get("password");
  const name = formData.get("name");
  const passwordConfirm = formData.get("passwordConfirm");
  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    typeof name !== "string" ||
    typeof passwordConfirm !== "string"
  ) {
    throw new Error("Invalid input");
  }
  const errors: fields = {};
  const values: fields = {};
  if (username.length === 0) {
    errors.username = "Username is required";
  } else if (username.length < 4) {
    errors.username = "Username must be alteast 4 characters long";
    values.username = username;
  } else {
    values.username = username;
  }
  if (password.length === 0) {
    errors.password = "Password is required";
  } else if (password.length < 4) {
    errors.password = "Password must be atleast 4 characters long";
    values.password = password;
  } else {
    values.password = password;
  }
  if (name.length === 0) {
    errors.name = "Name is required";
  } else {
    values.name = name;
  }

  if (passwordConfirm !== password) {
    errors.passwordConfirm = "Passwords don't match";
    values.passwordConfirm = passwordConfirm;
  } else {
    values.passwordConfirm = passwordConfirm;
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values,
      success: false,
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    name,
    username,
    passwordHash,
  });
  revalidatePath("/users");
  return {
    errors: {},
    values: {},
    success: true,
  };
  //   redirect("/login");
};

export const getToken = async (username: string): Promise<string | null> => {
  if (!username) {
    throw new Error("username is undefined");
  }
  const userData = await db.query.users.findFirst({
    where: eq(users.username, username),
  });
  if (!userData) {
    throw new Error("user does not exist");
  }
  if (userData.token) return userData.token;
  return null;
};

export const generateToken = async () =>
  //   username: string | undefined,
  //   prevState: string | null,
  //   formData: FormData,
  {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      throw new Error("username is undefined");
    }

    const username = session.user.email;

    const token = crypto.randomUUID();
    await db.update(users).set({ token }).where(eq(users.username, username));

    revalidatePath("/me");
  };

export const getReadingList = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    throw new Error("username is undefined");
  }

  const username = session.user.email;

  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (!user) throw new Error("user not found");
  const userId = user.id;
  return await db.query.readingList.findMany({
    where: eq(readingList.userId, userId),
    with: {
      blog: true,
    },
  });
};
