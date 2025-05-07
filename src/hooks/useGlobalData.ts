"use client";
import { useQueryClient } from "@tanstack/react-query";

export function useGlobalData<T = unknown>(queryKey: string[]): T | undefined {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<T>(queryKey);
}