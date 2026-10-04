"use client";

import { useNotification } from "./NotificationContext";

export default function Notification() {
  const { type, message } = useNotification();
  if (!message) return null;
  //   const notificationStyle: React.CSSProperties = {
  //     padding: "10px 16px",
  //     marginBottom: "10px",
  //     borderRadius: "4px",
  //     color: "white",
  //     backgroundColor: type === "success" ? "#16a34a" : "#dc2626",
  //     whiteSpace: "pre-line",
  //   };

  return (
    <div
      data-testid="notification"
      className={`max-w-2xl mx-auto px-4 py-[10px] mb-2.5 rounded text-white ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      } whitespace-pre-line`}
    >
      {message}
    </div>
  );
}
