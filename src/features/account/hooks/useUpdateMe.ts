"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateMe } from "@/src/features/account/api/updateMe";

export function useUpdateMe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMe,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
