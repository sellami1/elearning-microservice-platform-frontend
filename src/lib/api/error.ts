import axios from "axios";

export type AppError = {
  statusCode: number;
  message: string;
  fieldErrors?: Array<{
    path: string;
    message: string;
  }>;
};

type ValidationErrorItem = {
  path?: string;
  msg?: string;
};

const FALLBACK_MESSAGE = "Unexpected error. Please try again.";

export function normalizeError(error: unknown): AppError {
  if (!axios.isAxiosError(error)) {
    return {
      statusCode: 500,
      message: FALLBACK_MESSAGE,
    };
  }

  const statusCode = error.response?.status ?? 500;
  const payload = error.response?.data as
    | { message?: string; status?: string; errors?: ValidationErrorItem[] }
    | undefined;

  const fieldErrors = payload?.errors?.map((item) => ({
    path: item.path ?? "form",
    message: item.msg ?? "Invalid value",
  }));

  return {
    statusCode,
    message: payload?.message ?? FALLBACK_MESSAGE,
    fieldErrors: fieldErrors && fieldErrors.length > 0 ? fieldErrors : undefined,
  };
}
