"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const { data: session } = useSession();
  const linkStyle = "hover:text-blue-600 hover:underline transition-colors";

  return (
    <nav className="border-b p-4 mb-6 flex flex-wrap items-center gap-3 max-w-4xl mx-auto">
      <Link href="/" className={linkStyle}>
        home
      </Link>
      <span className="text-gray-500">|</span>
      <Link href="/blogs" className={linkStyle}>
        blogs
      </Link>
      <span className="text-gray-500">|</span>
      <Link href="/users" className={linkStyle}>
        users
      </Link>
      <span className="text-gray-500">|</span>

      {session && session.user?.name ? (
        <>
          <Link href="/blogs/new" className={linkStyle}>
            new blog
          </Link>
          <span className="text-gray-500">|</span>
          <Link href="/me" className={linkStyle}>
            me
          </Link>
          <span className="text-gray-500">|</span>
          <em className="text-gray-600">{session.user.name} logged in</em>
          <button
            onClick={() => signOut()}
            className="border rounded px-3 py-1 text-sm hover:bg-gray-100 transition-colors ml-auto"
          >
            logout
          </button>
        </>
      ) : (
        <>
          <Link href="/login" className={linkStyle}>
            login
          </Link>
          <span className="text-gray-500">|</span>
          <Link href="/register" className={linkStyle}>
            register
          </Link>
          <span className="text-gray-500">|</span>
          {/* <Link href="/blogs/new" className={linkStyle}>
            new blog
          </Link> */}
        </>
      )}
    </nav>
  );
}
