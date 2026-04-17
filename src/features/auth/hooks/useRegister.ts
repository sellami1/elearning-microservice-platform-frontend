"use client";

import { useMutation } from "@tanstack/react-query";

import { register } from "@/src/features/auth/api/register";

export function useRegister() {
  return useMutation({
    mutationFn: register,
  });
}
