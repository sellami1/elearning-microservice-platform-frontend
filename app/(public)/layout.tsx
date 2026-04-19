import { PublicOnlyRoute } from "@/src/components/PublicOnlyRoute";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <PublicOnlyRoute>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-6">
        <section className="mx-auto w-full max-w-3xl">{children}</section>
      </main>
    </PublicOnlyRoute>
  );
}
