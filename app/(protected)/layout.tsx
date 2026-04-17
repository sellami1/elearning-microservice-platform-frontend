import { ProtectedRoute } from "@/src/components/ProtectedRoute";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <ProtectedRoute>{children}</ProtectedRoute>
    </main>
  );
}
