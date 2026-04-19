import type { UserRole } from "@/src/lib/utils/role";

export function isAuthRoute(pathname: string): boolean {
  return [
    "/login",
    "/register",
  ].some((prefix) => pathname.startsWith(prefix));
}

export function canAccessProtectedRoute(isAuthenticated: boolean): boolean {
  return isAuthenticated;
}

export function canAccessRole(role: UserRole | null, allowedRoles: UserRole[]): boolean {
  if (!role) {
    return false;
  }

  return allowedRoles.includes(role);
}
