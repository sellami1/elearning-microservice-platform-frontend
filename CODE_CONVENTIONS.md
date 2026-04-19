Got it. Role‑based e‑learning with Zustand for client state mgmt. Here's the refined, minimal structure focused on performance and low complexity.

## Updated Folder Structure

```
src/
├── components/           # Dumb UI (no logic)
│   ├── common/           # Button, Card, Spinner, etc.
│   └── layout/           # Header, Sidebar, Footer
│
├── pages/                # Route definitions
│   ├── _app.tsx
│   ├── index.tsx         # Public landing
│   ├── dashboard/        # Protected area (role‑based)
│   │   ├── instructor.tsx
│   │   └── learner.tsx
│   └── login.tsx
│
├── services/             # API calls (Axios + React Query)
│   ├── apiClient.ts
│   └── endpoints/
│       ├── auth.ts
│       ├── courses.ts
│       └── users.ts
│
├── hooks/                # React Query wrappers + custom hooks
│   ├── useAuth.ts
│   ├── useCourses.ts
│   └── useRoleGuard.ts   # Client‑side route protection
│
├── stores/               # Zustand stores (client state only)
│   ├── authStore.ts      # User, role, token
│   └── uiStore.ts        # Sidebar open, theme, etc.
│
├── lib/                  # Types, constants, utils
│   ├── types.ts
│   ├── constants.ts      # Role enums
│   └── utils.ts
│
├── styles/
│   └── globals.css       # Tailwind imports
│
└── middleware.ts         # Optional: static redirects (no runtime)
```

---

## Critical Code Snippets

### `stores/authStore.ts` – Zustand for Auth & Role

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Role = 'guest' | 'learner' | 'instructor';

interface AuthState {
  user: { id: string; name: string; role: Role } | null;
  token: string | null;
  setAuth: (user: AuthState['user'], token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: 'auth-storage' } // persists in localStorage
  )
);
```

### `hooks/useRoleGuard.ts` – Client‑side Route Protection

```typescript
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';

export const useRoleGuard = (allowedRoles: Role[]) => {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    } else if (!allowedRoles.includes(user.role)) {
      router.replace('/'); // or a 403 page
    }
  }, [user, allowedRoles, router]);

  return user;
};
```

### `pages/dashboard/instructor.tsx` – Example Protected Page

```tsx
import { useRoleGuard } from '@/hooks/useRoleGuard';
import { useCourses } from '@/hooks/useCourses';

export default function InstructorDashboard() {
  const user = useRoleGuard(['instructor']);
  const { data: courses } = useCourses({ instructorId: user?.id });

  if (!user) return null; // Guard will redirect

  return (
    <div className="p-6">
      <h1>Instructor Dashboard</h1>
      {/* Render courses */}
    </div>
  );
}
```

### `pages/_app.tsx` – Providers

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
```

### `services/apiClient.ts` – Auto‑Attach Token from Zustand

```typescript
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token; // Access store outside React
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;
```

---

## Role‑Based Navigation in Layout

```tsx
// components/layout/Header.tsx
import { useAuthStore } from '@/stores/authStore';
import Link from 'next/link';

export const Header = () => {
  const { user, logout } = useAuthStore();

  return (
    <nav className="flex gap-4 p-4">
      <Link href="/">Home</Link>
      {user?.role === 'instructor' && <Link href="/dashboard/instructor">Instructor</Link>}
      {user?.role === 'learner' && <Link href="/dashboard/learner">My Courses</Link>}
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </nav>
  );
};
```

---

## Simplicity & Performance Wins

| Area                | Approach                                     | Benefit                                                         |
|---------------------|----------------------------------------------|-----------------------------------------------------------------|
| **State Mgmt**      | Zustand (client) + React Query (server)      | Zero boilerplate, optimal cache, no prop drilling                |
| **Auth & Roles**    | Zustand store + localStorage persist         | Instant role checks, survives refresh, no extra requests         |
| **Route Guard**     | Custom hook with `useEffect` + `router`      | Lightweight, works with static export, no middleware runtime     |
| **API Calls**       | Axios interceptor reads token from store     | Single source of truth for auth header                           |
| **Styling**         | Tailwind CSS                                 | No runtime CSS‑in‑JS, perfect for static export                  |
| **Build Output**    | `next export` → static files                 | Deploy anywhere, 0 server cost, instant CDN cache                |

This setup keeps the codebase lean, the bundle small, and the dev velocity high—exactly what you need for a role‑based e‑learning frontend without any backend or SSR complexity