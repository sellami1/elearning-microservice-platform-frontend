export type UserRole = "learner" | "instructor";

export function toDisplayRole(role: UserRole): string {
  return role === "instructor" ? "Instructor" : "Learner";
}
