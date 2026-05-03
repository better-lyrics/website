type Status = "operational" | "degraded" | "downtime";

type OpenStatusValue =
  | "operational"
  | "degraded_performance"
  | "partial_outage"
  | "major_outage"
  | "under_maintenance"
  | "unknown"
  | "incident";

interface Env {
  STATUS_CACHE: KVNamespace;
}

const CACHE_KEY = "status";
const CACHE_TTL = 60;

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

const json = (status: Status) =>
  new Response(JSON.stringify({ status }), { headers });

const STATUS_PAGE_SLUG = "better-lyrics";

const STATUS_MAP: Record<OpenStatusValue, Status> = {
  operational: "operational",
  degraded_performance: "degraded",
  under_maintenance: "degraded",
  unknown: "degraded",
  partial_outage: "downtime",
  major_outage: "downtime",
  incident: "downtime",
};

async function fetchStatus(): Promise<Status> {
  const res = await fetch(
    `https://api.openstatus.dev/public/status/${STATUS_PAGE_SLUG}`
  );

  if (!res.ok) return "operational";

  const { status } = await res.json<{ status: OpenStatusValue }>();

  return STATUS_MAP[status] ?? "operational";
}

const worker: ExportedHandler<Env> = {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    const cached = await env.STATUS_CACHE.get<Status>(CACHE_KEY, "json");
    if (cached) return json(cached);

    const status = await fetchStatus();
    await env.STATUS_CACHE.put(CACHE_KEY, JSON.stringify(status), {
      expirationTtl: CACHE_TTL,
    });

    return json(status);
  },
};

export default worker;
