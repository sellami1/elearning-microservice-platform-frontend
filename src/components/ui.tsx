"use client";

import clsx from "clsx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">{title}</h2>
      {children}
    </section>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-1 text-sm text-rose-700">{message}</p>;
}

export function Input(props: ComponentPropsWithoutRef<"input">) {
  return (
    <input
      {...props}
      className={clsx(
        "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900",
        "outline-none ring-0 focus:border-slate-500",
        props.className
      )}
    />
  );
}

export function Label({ children, htmlFor }: { children: ReactNode; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-slate-700">
      {children}
    </label>
  );
}

export function Button(props: ComponentPropsWithoutRef<"button">) {
  return (
    <button
      {...props}
      className={clsx(
        "rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white",
        "disabled:cursor-not-allowed disabled:opacity-60",
        props.className
      )}
    />
  );
}
