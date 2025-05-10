import React from "react";

export function Card({ children, ...props }: { children: React.ReactNode, [key: string]: any }) {
  return (
    <div className="bg-white rounded-lg shadow" {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, ...props }: { children: React.ReactNode, [key: string]: any }) {
  return (
    <div className="p-4" {...props}>
      {children}
    </div>
  );
}
