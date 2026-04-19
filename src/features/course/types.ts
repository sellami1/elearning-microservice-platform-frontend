export type CourseLevel = "beginner" | "intermediate" | "advanced";

export type Course = {
  id: string;
  title: string;
  description: string | null;
  short_description: string | null;
  price: number;
  category: string | null;
  subcategory: string | null;
  level: CourseLevel;
  duration_hours: number;
  published: boolean;
  is_featured: boolean;
  thumbnail_url: string | null;
  instructor_id: string;
  rating: number;
  total_ratings: number;
  total_enrollments: number;
  created_at: string;
  updated_at: string;
};

export type CourseListResponse = {
  items: Course[];
  total: number;
  page: number;
  size: number;
  pages: number;
};

export type CourseFormValues = {
  title: string;
  description?: string;
  short_description?: string;
  price: number;
  category?: string;
  subcategory?: string;
  level: CourseLevel;
  duration_hours: number;
  published: boolean;
  is_featured: boolean;
  thumbnailFile?: FileList | null;
};

export type CourseUpdateFormValues = Partial<CourseFormValues>;

export type CourseUpdateResponse = Course & {
  thumbnail_updated: boolean;
};

export type CourseResponse = Course;

export type LessonContentType = "video" | "text" | "pdf" | "quiz" | "audio" | "image";

export type Lesson = {
  id: string;
  title: string;
  description: string | null;
  content_type: LessonContentType;
  duration_minutes: number;
  order_index: number;
  is_preview: boolean;
  is_published: boolean;
  course_id: string;
  content_url: string | null;
  created_at: string;
  updated_at: string;
};

export type LessonListResponse = {
  items: Lesson[];
  total: number;
  page: number;
  size: number;
  pages: number;
};

export type LessonFormValues = {
  title: string;
  description?: string;
  content_type: LessonContentType;
  duration_minutes: number;
  order_index?: number;
  is_preview: boolean;
  is_published: boolean;
  course_id: string;
  content_url?: string;
  contentFile?: FileList | null;
};

export type LessonUpdateFormValues = Partial<LessonFormValues>;

export type Enrollment = {
  id: string;
  course_id: string;
  user_id: string;
  completed: boolean;
  progress_percentage: number;
  enrolled_at: string;
  last_accessed_at: string;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
};

export type EnrollmentWithCourse = Enrollment & {
  course_title: string;
  course_thumbnail: string | null;
  course_instructor: string;
  total_lessons: number;
  completed_lessons: number;
};

export type EnrollmentStats = {
  total_enrollments: number;
  active_enrollments: number;
  completed_enrollments: number;
  average_progress: number;
  total_courses_enrolled: number;
};

export type EnrollmentListResponse = {
  items: EnrollmentWithCourse[];
  total: number;
  page: number;
  size: number;
  pages: number;
  stats?: EnrollmentStats | null;
};

export type InstructorEnrollmentItem = {
  enrollment_id: string;
  user_id: string;
  enrolled_at: string;
  progress_percentage: number;
  completed: boolean;
  total_time_spent_minutes: number;
  last_accessed_at: string;
  last_lesson_id: string | null;
};

export type InstructorEnrollmentGroup = {
  course_id: string;
  course_title: string;
  items: InstructorEnrollmentItem[];
};

export type CourseEnrollmentListResponse = {
  course_id: string;
  course_title: string;
  items: InstructorEnrollmentItem[];
  total: number;
  page: number;
  size: number;
  pages: number;
};

export type InstructorEnrollmentsResponse = {
  enrolls: InstructorEnrollmentGroup[];
  total: number;
  page: number;
  size: number;
  pages: number;
};