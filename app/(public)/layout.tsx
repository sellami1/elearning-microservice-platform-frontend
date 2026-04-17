import { PublicOnlyRoute } from "@/src/components/PublicOnlyRoute";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <PublicOnlyRoute>{children}</PublicOnlyRoute>
    </main>
  );
}
