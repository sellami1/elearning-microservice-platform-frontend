import Link from "next/link";

import { RegisterForm } from "@/src/features/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="space-y-4">
      <RegisterForm />
      <p className="text-sm text-slate-700">
        Already have an account? <Link className="font-medium text-slate-900 underline" href="/login">Login</Link>
      </p>
    </div>
  );
}
