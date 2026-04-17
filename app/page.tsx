import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center gap-8 px-4 py-12">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
          Phase 1
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          User Service Frontend Boilerplate
        </h1>
        <p className="max-w-2xl text-slate-700">
          This starter includes the user-service flows covered by the backend contract: register,
          login, profile lookup, and profile update.
        </p>
      </header>

      <div className="flex flex-wrap gap-3">
        <Link className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white" href="/login">
          Login
        </Link>
        <Link className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900" href="/register">
          Register
        </Link>
        <Link className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900" href="/account">
          Account
        </Link>
      </div>
    </main>
  );
}
