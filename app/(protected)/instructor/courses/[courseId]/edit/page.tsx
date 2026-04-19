import { CourseForm } from "@/src/features/course/components/CourseForm";
import { getCourse } from "@/src/features/course/api/courses";

type EditCoursePageProps = {
  params: Promise<{ courseId: string }>;
};

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const { courseId } = await params;
  const course = await getCourse(courseId);

  return <CourseForm mode="edit" course={course} />;
}