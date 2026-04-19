import { InstructorCourseList } from "@/src/features/course/components/CourseList";

export default function InstructorCoursesPage() {
  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Instructor tools</p>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">My courses</h1>
      </header>
      <InstructorCourseList />
    </div>
  );
}