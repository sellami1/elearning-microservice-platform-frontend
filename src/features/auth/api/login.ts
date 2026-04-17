import type { LoginRequest, LoginResponse } from "@/src/features/auth/types";
import { apiClient } from "@/src/lib/api/client";
import { userServiceEndpoints } from "@/src/lib/api/endpoints";

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>(
    userServiceEndpoints.login,
    payload
  );

  return data;
}
