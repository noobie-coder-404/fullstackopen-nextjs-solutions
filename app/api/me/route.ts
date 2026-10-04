import { NextResponse, NextRequest } from "next/server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const GET = async (req: NextRequest) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userData = await db.query.users.findFirst({
    where: eq(users.token, token),
    with: { blogs: true },
    columns: {
      passwordHash: false,
      token: false,
    },
  });
  if (!userData)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  return NextResponse.json(userData);
};
