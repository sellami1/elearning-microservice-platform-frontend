import Link from "next/link";

import { RegisterForm } from "@/src/features/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="space-y-4">
      <RegisterForm />
      <p className="text-sm text-[var(--muted-foreground)]">
        Already have an account? <Link className="font-medium text-[var(--foreground)] underline" href="/login">Login</Link>
      </p>
    </div>
  );
}
