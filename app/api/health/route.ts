// Liveness endpoint for Docker HEALTHCHECK and the reverse proxy.
// Keep it dependency-free: if this returns 200 the process is serving.
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ status: "ok", uptime: Math.round(process.uptime()) });
}
