import { MyEnrollmentList } from "@/src/features/course/components/EnrollmentList";

export default function EnrollmentsPage() {
  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Learner tools</p>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">My enrollments</h1>
      </header>
      <MyEnrollmentList />
    </div>
  );
}