import { jwtDecode } from "jwt-decode";

const TOKEN_STORAGE_KEY = "auth_token";

export type JwtClaims = {
  userId: string;
  role: "learner" | "instructor";
  exp: number;
  iat: number;
};

export function setStoredToken(token: string): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function clearStoredToken(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export function decodeToken(token: string): JwtClaims | null {
  try {
    return jwtDecode<JwtClaims>(token);
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const claims = decodeToken(token);

  if (!claims?.exp) {
    return true;
  }

  const nowInSeconds = Math.floor(Date.now() / 1000);
  return claims.exp <= nowInSeconds;
}
