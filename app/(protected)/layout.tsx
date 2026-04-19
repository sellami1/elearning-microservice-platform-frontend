import { ProtectedRoute } from "@/src/components/ProtectedRoute";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-6">
        <section className="mx-auto w-full max-w-4xl">{children}</section>
      </main>
    </ProtectedRoute>
  );
}
