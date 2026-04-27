"use client";

import { Suspense } from "react";
import { HomeContent } from "./HomeContent";

export default function Home() {
  return (
    <Suspense fallback={
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center gap-8 px-4 py-12">
        <p className="text-sm text-[var(--muted-foreground)]">Loading home page...</p>
      </main>
    }>
      <HomeContent />
    </Suspense>
  );
}
