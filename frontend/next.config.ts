import type { NextConfig } from "next";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

function strapiRemotePattern() {
  try {
    const url = new URL(strapiUrl);
    return {
      protocol: url.protocol.replace(":", "") as "http" | "https",
      hostname: url.hostname,
      ...(url.port ? { port: url.port } : {}),
      pathname: "/uploads/**",
    };
  } catch {
    return {
      protocol: "http" as const,
      hostname: "localhost",
      port: "1337",
      pathname: "/uploads/**",
    };
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      strapiRemotePattern(),
      {
        protocol: "https",
        hostname: "**.strapiapp.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
