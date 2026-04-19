import Link from "next/link";

import type { Course } from "@/src/features/course/types";
import { getPublicMediaUrl } from "@/src/lib/utils/media";

export function CourseCard({ course, href }: { course: Course; href: string }) {
  const imageSrc = getPublicMediaUrl(course.thumbnail_url);

  return (
    <article className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm group">
      <div className="aspect-[16/9] w-full bg-[var(--muted)]">
        <img
          alt={course.title}
          className="h-full w-full object-cover select-none"
          src={imageSrc}
        />
      </div>

      <div className="flex flex-col p-5 h-[calc(100%-56.25%)]">
        <div className="space-y-1 mt-1 mb-2">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--muted-foreground)]">
            {course.level} · {course.published ? "Published" : "Draft"}
          </p>
          <h3 className="text-lg font-semibold leading-tight text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors line-clamp-2">
            {course.title}
          </h3>
          <p className="text-sm leading-relaxed text-[var(--muted-foreground)] line-clamp-2">
            {course.short_description || course.description || "No description provided."}
          </p>
        </div>

        <div className="mt-auto pt-4 flex flex-wrap gap-x-3 gap-y-1.5 text-xs font-medium text-[var(--muted-foreground)]">
          <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-[var(--muted)]">{course.duration_hours}h</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-[var(--muted)]">${course.price.toFixed(2)}</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-[var(--muted)]">{course.total_enrollments} enrolled</span>
        </div>

        <div className="mt-4">
          <Link className="inline-block text-sm font-medium text-[var(--primary)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 rounded-sm" href={href}>
            View course →
          </Link>
        </div>
      </div>
    </article>
  );
}