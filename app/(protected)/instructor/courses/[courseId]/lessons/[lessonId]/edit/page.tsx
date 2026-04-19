import Link from "next/link";
import { notFound } from "next/navigation";

import { getCourse } from "@/src/features/course/api/courses";
import { getLesson } from "@/src/features/course/api/lessons";
import { LessonForm } from "@/src/features/course/components/LessonForm";

type EditLessonPageProps = {
  params: Promise<{ courseId: string; lessonId: string }>;
};

export default async function EditLessonPage({ params }: EditLessonPageProps) {
  const { courseId, lessonId } = await params;
  
  let course;
  let lesson;
  
  try {
    [course, lesson] = await Promise.all([
      getCourse(courseId),
      getLesson(lessonId)
    ]);
  } catch (error) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Instructor tools</p>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">Edit lesson</h1>
        <p className="text-sm text-[var(--muted-foreground)]">Updating lesson in {course.title}.</p>
        <Link className="font-medium text-[var(--foreground)] underline" href={`/instructor/courses/${course.id}/lessons`}>
          Back to lessons
        </Link>
      </header>

      <LessonForm course={course} lesson={lesson} mode="edit" />
    </div>
  );
}
