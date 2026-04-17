import type { AppError } from "@/src/lib/api/error";

export function getErrorMessage(error: unknown, fallback = "Request failed"): string {
  if (!error) {
    return fallback;
  }

  if (typeof error === "string") {
    return error;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message: string }).message === "string"
  ) {
    return (error as { message: string }).message;
  }

  return fallback;
}

export function getFieldError(error: unknown, path: string): string | undefined {
  if (
    typeof error !== "object" ||
    error === null ||
    !("fieldErrors" in error)
  ) {
    return undefined;
  }

  const fieldErrors = (error as AppError).fieldErrors;
  return fieldErrors?.find((fieldError) => fieldError.path === path)?.message;
}
