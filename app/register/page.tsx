"use client";
import { registerUser } from "@/app/actions/users";
import { useNotification } from "@/app/components/NotificationContext";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterUser() {
  const [state, formAction] = useActionState(registerUser, {
    errors: {},
    values: {},
    success: false,
  });
  const router = useRouter();

  const { showNotification } = useNotification();

  useEffect(() => {
    if (state.success) {
      showNotification("user created", "success");
      router.push("/login");
    } else {
      const notificationMessage = Object.values(state.errors).join("\n");
      showNotification(notificationMessage, "error");
    }
  }, [state, router, showNotification]);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl text-center text-blue-600 uppercase font-bold mb-4">
        Register
      </h2>
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            defaultValue={state?.values?.username}
            required
            className="w-full border rounded p-2 bg-transparent"
          />
          {state?.errors?.username && (
            <span data-testid="username-error" className="text-red-500 text-sm">
              {state.errors.username}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="name" className="block mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            defaultValue={state?.values?.name}
            required
            className="w-full border rounded p-2 bg-transparent"
          />
          {state?.errors?.name && (
            <span data-testid="name-error" className="text-red-500 text-sm">
              {state.errors.name}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            defaultValue={state?.values?.password}
            required
            className="w-full border rounded p-2 bg-transparent"
          />
          {state?.errors?.password && (
            <span data-testid="password-error" className="text-red-500 text-sm">
              {state.errors.password}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="passwordConfirm" className="block mb-1">
            Confirm Password
          </label>
          <input
            id="passwordConfirm"
            type="password"
            name="passwordConfirm"
            defaultValue={state?.values?.passwordConfirm}
            required
            className="w-full border rounded p-2 bg-transparent"
          />
          {state?.errors?.passwordConfirm && (
            <span
              data-testid="passwordConfirm-error"
              className="text-red-500 text-sm"
            >
              {state.errors.passwordConfirm}
            </span>
          )}
        </div>
        <button
          type="submit"
          data-testid="register-button"
          className="w-full border rounded px-4 py-2 hover:bg-gray-100 transition-colors"
        >
          Register
        </button>
      </form>
    </div>
  );
}
