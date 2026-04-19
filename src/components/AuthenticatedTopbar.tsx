"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ThemeToggle } from "@/src/components/ThemeToggle";
import { useAuthStore } from "@/src/store/auth.store";

function linkClass(isActive: boolean): string {
  return isActive
    ? "rounded-full bg-[var(--primary)] px-4 py-2 font-medium text-[var(--primary-foreground)]"
    : "rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 font-medium text-[var(--foreground)]";
}

export function AuthenticatedTopbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const role = useAuthStore((state) => state.role);
  const clearSession = useAuthStore((state) => state.clearSession);

  const myCoursesHref = isAuthenticated && role === "instructor" ? "/instructor/courses" : "/enrollments";
  const isMyCoursesActive = isAuthenticated ? pathname === myCoursesHref || pathname.startsWith(`${myCoursesHref}/`) : false;
  const isProfileActive = pathname === "/account";
  const isBrowseActive = pathname === "/" && searchParams.get("view") === "browse";

  const handleLogout = () => {
    clearSession();
    router.push("/login");
  };

  return (
    <div className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--surface)] px-4 py-4 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
        <Link className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--foreground)]" href="/">
          E-Learning
        </Link>

        <nav className="flex flex-wrap items-center gap-2 text-sm">
          {isAuthenticated ? (
            <>
              <Link className={linkClass(isMyCoursesActive)} href={myCoursesHref}>
                My courses
              </Link>

              {role === "learner" ? (
                <Link className={linkClass(isBrowseActive)} href="/?view=browse">
                  Browse courses
                </Link>
              ) : null}

              <Link className={linkClass(isProfileActive)} href="/account">
                Profile
              </Link>

              <button
                type="button"
                className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 font-medium text-[var(--foreground)]"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className={linkClass(isBrowseActive)} href="/?view=browse">
                Browse courses
              </Link>
              <Link className={linkClass(pathname === "/login")} href="/login">
                Login
              </Link>
              <Link className={linkClass(pathname === "/register")} href="/register">
                Register
              </Link>
            </>
          )}

          <ThemeToggle />
        </nav>
      </div>
    </div>
  );
}