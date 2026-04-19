"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuthStore } from "@/src/store/auth.store";

export function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isCourseRoute = pathname.startsWith("/courses");

  useEffect(() => {
    if (isAuthenticated && !isCourseRoute) {
      router.replace("/");
    }
  }, [isAuthenticated, isCourseRoute, router]);

  if (isAuthenticated && !isCourseRoute) {
    return <p className="text-sm text-[var(--muted-foreground)]">Redirecting...</p>;
  }

  return <>{children}</>;
}
