// hooks/use-toast.ts
import { useCallback } from "react";

export function useToast() {
  return {
    toast: useCallback(({ title, description }: { title: string; description?: string }) => {
      alert(title + (description ? `\n${description}` : ""));
    }, []),
  };
}