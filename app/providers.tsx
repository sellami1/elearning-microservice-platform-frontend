"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    const root = document.documentElement;
    // Set initial theme
    const currentTheme = root.dataset.theme as "light" | "dark";
    if (currentTheme) setTheme(currentTheme);

    // Watch for theme changes on HTML tag
    const observer = new MutationObserver(() => {
      const mode = root.dataset.theme as "light" | "dark";
      if (mode) setTheme(mode);
    });

    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster richColors position="top-right" theme={theme} />
    </QueryClientProvider>
  );
}
