import type { NextConfig } from "next";

/**
 * Security headers for all routes.
 * NOTE on framing: the site intentionally offers embeddable calculators under
 * /embed/*, so X-Frame-Options / frame-ancestors are relaxed ONLY there.
 * Everywhere else the site must not be framed (clickjacking protection).
 * CSP is kept in report-friendly form: we restrict framing, objects and base-uri
 * without breaking Next.js inline scripts, Supabase, or AdSense.
 */
const baseHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // All normal pages: cannot be framed by other sites
        source: "/((?!embed/).*)",
        headers: [
          ...baseHeaders,
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self'; object-src 'none'; base-uri 'self'; form-action 'self'",
          },
        ],
      },
      {
        // Embeddable calculators: framing allowed by design (product feature)
        // :path+ (one or more segments) so bare /embed does NOT match this
        // rule and keeps the standard frame-ancestors 'self' CSP.
        source: "/embed/:path+",
        headers: [
          ...baseHeaders,
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors *; object-src 'none'; base-uri 'self'; form-action 'self'",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Patreon slug that the old generateSlug() bug produced and may be indexed/linked
      {
        source: "/creator/patreon-tier-optimization-optimizer",
        destination: "/creator/patreon-tier-optimization",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
