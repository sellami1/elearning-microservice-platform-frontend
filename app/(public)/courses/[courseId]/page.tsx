import { CourseDetail } from "@/src/features/course/components/CourseDetail";

type CoursePageProps = {
  params: Promise<{ courseId: string }>;
};

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params;
  return <CourseDetail courseId={courseId} />;
}