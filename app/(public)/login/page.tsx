import Link from "next/link";
import { Suspense } from "react";

import { LoginForm } from "@/src/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="space-y-4">
      <Suspense fallback={<p className="text-sm text-[var(--muted-foreground)]">Loading login form...</p>}>
        <LoginForm />
      </Suspense>
      <p className="text-sm text-[var(--muted-foreground)]">
        No account? <Link className="font-medium text-[var(--foreground)] underline" href="/register">Register</Link>
      </p>
    </div>
  );
}
