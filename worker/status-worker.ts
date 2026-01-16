type Status = "operational" | "degraded" | "downtime";

interface Env {
  BETTERSTACK_KEY: string;
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

const STATUS_PAGE_ID = "189479";

async function fetchStatus(env: Env): Promise<Status> {
  const res = await fetch(
    `https://uptime.betterstack.com/api/v2/status-pages/${STATUS_PAGE_ID}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.BETTERSTACK_KEY}`,
      },
    }
  );

  if (!res.ok) return "operational";

  const { data } = await res.json<{
    data: { attributes: { aggregate_state: Status } };
  }>();

  return data?.attributes?.aggregate_state ?? "operational";
}

const worker: ExportedHandler<Env> = {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    const cached = await env.STATUS_CACHE.get<Status>(CACHE_KEY, "json");
    if (cached) return json(cached);

    const status = await fetchStatus(env);
    await env.STATUS_CACHE.put(CACHE_KEY, JSON.stringify(status), {
      expirationTtl: CACHE_TTL,
    });

    return json(status);
  },
};

export default worker;
