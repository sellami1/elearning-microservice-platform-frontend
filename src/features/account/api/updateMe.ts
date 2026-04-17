import type { UpdateMeRequest } from "@/src/features/account/types";
import { apiClient } from "@/src/lib/api/client";
import { userServiceEndpoints } from "@/src/lib/api/endpoints";

export async function updateMe(payload: UpdateMeRequest) {
  const { data } = await apiClient.put<{ status: string; data: { _id: string; email: string; role: string } }>(
    userServiceEndpoints.updateMe,
    payload
  );

  return data.data;
}
