"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { User, Role } from "@/src/features/auth/types";
import { clearStoredToken, setStoredToken } from "@/src/lib/auth/token";

type AuthState = {
  token: string | null;
  role: Role | null;
  user: User | null;
  isAuthenticated: boolean;
  setSession: (payload: { token: string; role: Role; user?: User }) => void;
  setUser: (user: User) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      role: null,
      user: null,
      isAuthenticated: false,
      setSession: ({ token, role, user }) => {
        setStoredToken(token);
        set({
          token,
          role,
          user: user ?? null,
          isAuthenticated: true,
        });
      },
      setUser: (user) => {
        set((state) => ({
          ...state,
          user,
          role: user.role,
          isAuthenticated: true,
        }));
      },
      clearSession: () => {
        clearStoredToken();
        set({ token: null, role: null, user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
