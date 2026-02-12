import type { ApiErrorResponse } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Default shadcn/ui helper for Tailwind class merging
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  
  const apiError = error as ApiErrorResponse;
  if (apiError.response?.data?.msg) {
    return apiError.response?.data?.msg || "Server error";
  }

  if (typeof error === 'string') return error;
  
  return 'An unexpected error occurred';
}