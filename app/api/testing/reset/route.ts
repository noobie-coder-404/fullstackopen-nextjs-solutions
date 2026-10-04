import { sql } from "drizzle-orm";
import { db } from "@/db";
import { NextResponse } from "next/server";

export const DELETE = async () => {
  // Execute a multi-statement raw SQL string directly
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
  await db.execute(
    sql.raw(`
    TRUNCATE TABLE users, blogs, reading_list CASCADE;
  `),
  );
  return NextResponse.json({
    states: 204,
  });

  console.log("Database wiped clean!");
};
