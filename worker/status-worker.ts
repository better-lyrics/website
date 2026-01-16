interface Env {
  BETTERSTACK_KEY: string;
  STATUS_CACHE: KVNamespace;
}

type TStatus = "operational" | "degraded" | "downtime";

interface BetterStackResponse {
  data: {
    attributes: {
      aggregate_state: TStatus;
    };
  };
}

const CACHE_TTL = 60;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Content-Type": "application/json",
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const cached = await env.STATUS_CACHE.get("status");
    if (cached) {
      return new Response(cached, { headers: corsHeaders });
    }

    const response = await fetch(
      `https://uptime.betterstack.com/api/v2/status-pages/${env.BETTERSTACK_KEY}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = (await response.json()) as BetterStackResponse;
    const status = data?.data?.attributes?.aggregate_state || "operational";
    const result = JSON.stringify({ status });

    await env.STATUS_CACHE.put("status", result, { expirationTtl: CACHE_TTL });

    return new Response(result, { headers: corsHeaders });
  },
};
