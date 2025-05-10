// components/ui/button.tsx
import React from "react";

export function Button({ children, ...props }) {
  return (
    <button
      className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
      {...props}
    >
      {children}
    </button>
  );
}