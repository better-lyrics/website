import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type TStatus = "operational" | "degraded" | "downtime";

type OpenStatusValue =
  | "operational"
  | "degraded_performance"
  | "partial_outage"
  | "major_outage"
  | "under_maintenance"
  | "unknown"
  | "incident";

const STATUS_PAGE_SLUG = "better-lyrics";

const STATUS_MAP: Record<OpenStatusValue, TStatus> = {
  operational: "operational",
  degraded_performance: "degraded",
  under_maintenance: "degraded",
  unknown: "degraded",
  partial_outage: "downtime",
  major_outage: "downtime",
  incident: "downtime",
};

export async function fetchStatus(): Promise<TStatus> {
  try {
    const res = await fetch(
      `https://api.openstatus.dev/public/status/${STATUS_PAGE_SLUG}`
    );
    if (!res.ok) return "operational";
    const { status } = (await res.json()) as { status: OpenStatusValue };
    return STATUS_MAP[status] ?? "operational";
  } catch {
    return "operational";
  }
}
