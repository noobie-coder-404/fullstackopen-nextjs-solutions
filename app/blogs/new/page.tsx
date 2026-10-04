"use client";
import { createBlog } from "../../actions/blogs";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "@/app/components/NotificationContext";

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, {
    errors: {},
    values: {},
    success: false,
  });

  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification("blog created", "success");
      router.push("/blogs");
    } else {
      const notificationMessage = Object.values(state.errors).join("\n");
      showNotification(notificationMessage, "error");
    }
  }, [showNotification, state, router]);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl text-center text-blue-600 uppercase font-bold mb-4">
        Add new blog
      </h2>
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            defaultValue={state?.values?.title ?? ""}
            required
            className="w-full border rounded p-2 bg-transparent"
          />
        </div>
        <div>
          <label htmlFor="author" className="block mb-1">
            Author
          </label>
          <input
            id="author"
            type="text"
            name="author"
            defaultValue={state?.values?.author ?? ""}
            required
            className="w-full border rounded p-2 bg-transparent"
          />
        </div>
        <div>
          <label htmlFor="url" className="block mb-1">
            URL
          </label>
          <input
            id="url"
            type="text"
            name="url"
            defaultValue={state?.values?.url ?? ""}
            required
            className="w-full border rounded p-2 bg-transparent"
          />
        </div>
        <button
          type="submit"
          data-testid="create-blog-button"
          className="w-full border rounded px-4 py-2 hover:bg-gray-100 transition-colors"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
