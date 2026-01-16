import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type TStatus = "operational" | "degraded" | "downtime";

export const STATUS_API_URL =
  process.env.NEXT_PUBLIC_STATUS_API || "/api/status";
