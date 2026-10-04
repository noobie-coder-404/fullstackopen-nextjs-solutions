"use client";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useNotification } from "@/app/components/NotificationContext";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await signOut({ redirect: false });
    
    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      showNotification("Successfully logged in", "success");
      router.push("/");
      router.refresh();
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl text-center text-blue-600 uppercase font-bold mb-4">
        Login
      </h2>
      {error && (
        <p data-testid="error-message" className="text-red-500 text-center">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            required
            className="w-full border rounded p-2 bg-transparent"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            className="w-full border rounded p-2 bg-transparent"
          />
        </div>
        <button
          type="submit"
          data-testid="login-button"
          className="w-full border rounded px-4 py-2 hover:bg-gray-100 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}
