import type { MeResponse } from "@/src/features/account/types";
import { apiClient } from "@/src/lib/api/client";
import { userServiceEndpoints } from "@/src/lib/api/endpoints";

export async function getMe() {
  const { data } = await apiClient.get<MeResponse>(userServiceEndpoints.me);
  return data.data;
}
