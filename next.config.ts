import type { NextConfig } from "next";

const scriptPolicy = process.env.NODE_ENV === "production" ? "script-src 'self' 'unsafe-inline'" : "script-src 'self' 'unsafe-inline' 'unsafe-eval'";
const nextConfig: NextConfig = {
  poweredByHeader: false,
  outputFileTracingIncludes: { "/story": ["./content/content-config.demo.json", "./content/content-config.private.json"], "/api/media/[id]": ["./private-media/**/*", "./content/content-config.private.json", "./content/content-config.demo.json"] },
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "no-referrer" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
        { key: "Content-Security-Policy", value: `default-src 'self'; img-src 'self' data: blob:; media-src 'self' blob:; style-src 'self' 'unsafe-inline'; ${scriptPolicy}; connect-src 'self' ws:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'` }
      ]
    }];
  }
};

export default nextConfig;
