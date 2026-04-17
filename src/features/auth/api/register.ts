import type { RegisterRequest } from "@/src/features/auth/types";
import { apiClient } from "@/src/lib/api/client";
import { userServiceEndpoints } from "@/src/lib/api/endpoints";

export async function register(payload: RegisterRequest): Promise<{ message: string }> {
  const { data } = await apiClient.post<{ status: string; message: string }>(
    userServiceEndpoints.register,
    payload
  );

  return { message: data.message };
}
