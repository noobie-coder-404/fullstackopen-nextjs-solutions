import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      {
        error: "This endpoint is not available in production",
      },
      {
        status: 403,
      },
    );
  }
  const body = await req.json();
  const { name, username, password } = body;
  const passwordHash = await bcrypt.hash(password, 10);
  await db.insert(users).values({
    name,
    username,
    passwordHash,
  });
  return NextResponse.json({
    status: 201,
  });
};
