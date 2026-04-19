# Course Service Frontend To-Do

Source contract: [backend/course-service/.github/docs/COURSE_REST_API_CONTRACT.md](../elearning-microservice-platform-backend/backend/course-service/.github/docs/COURSE_REST_API_CONTRACT.md)

## Already covered
- Course list and course detail consumption.
- Instructor course list, create, update, and delete.
- Lesson list on course detail.
- Learner enrollment creation.
- Learner enrollments list.
- Instructor enrollments list.
- Profile fetch/update flows from user-service.

## Remaining frontend consumption work
- [ ] Add course catalog filters and search UI for `GET /api/v1/courses` query params: `skip`, `limit`, `published`, `category`, `level`, `is_featured`, `search`, `instructor_id`.
- [ ] Add proper pagination controls for the public course catalog response metadata: `total`, `page`, `size`, `pages`.
- [ ] Add instructor lesson management UI for `POST /api/v1/lessons`.
- [ ] Add instructor lesson edit UI for `PUT /api/v1/lessons/{lesson_id}`.
- [ ] Add instructor lesson delete action for `DELETE /api/v1/lessons/{lesson_id}`.
- [ ] Add a dedicated lesson detail/player route for `GET /api/v1/lessons/{lesson_id}`.
- [ ] Add learner-friendly lesson access rules for preview vs published lessons using `is_preview` and `is_published`.
- [ ] Surface learner enrollment stats from `GET /api/v1/enrollments/me` (`stats`, `total`, `pages`, `completed`, `search`).
- [ ] Add instructor enrollment drill-down for `GET /api/v1/enrollments/course/{course_id}/enrollments`.
- [ ] Add instructor enrollment overview UI for `GET /api/v1/enrollments/instructor` pagination fields and grouped enrollment data.
- [ ] Add a lightweight service health/status page or diagnostics hook for `GET /health` and `GET /` if the frontend needs runtime service visibility.

## Notes
- The current frontend already consumes the main CRUD paths, so this list focuses on route params, pagination, and missing detail/management screens from the contract.
- If the catalog is meant to stay single-page, the search/filter work should land on the canonical home browse view instead of a separate `/courses` route.
