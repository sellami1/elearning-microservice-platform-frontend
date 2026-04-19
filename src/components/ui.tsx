"use client";

import clsx from "clsx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-[var(--foreground)]">{title}</h2>
      {children}
    </section>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-1 text-sm text-rose-600">{message}</p>;
}

export function Input(props: ComponentPropsWithoutRef<"input">) {
  return (
    <input
      {...props}
      className={clsx(
        "mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)]",
        "outline-none ring-0 focus:border-[var(--ring)]",
        props.className
      )}
    />
  );
}

export function Label({ children, htmlFor }: { children: ReactNode; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-[var(--muted-foreground)]">
      {children}
    </label>
  );
}

export function Button(props: ComponentPropsWithoutRef<"button">) {
  return (
    <button
      {...props}
      className={clsx(
        "rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-[var(--primary-foreground)]",
        "disabled:cursor-not-allowed disabled:opacity-60",
        props.className
      )}
    />
  );
}
