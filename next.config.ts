import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a self-contained server in .next/standalone so the Docker image
  // ships only what it needs to run (no dev deps, no source).
  output: "standalone",
};

export default nextConfig;
