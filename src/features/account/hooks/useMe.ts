"use client";

import { useQuery } from "@tanstack/react-query";

import { getMe } from "@/src/features/account/api/getMe";

export function useMe(enabled = true) {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled,
  });
}
