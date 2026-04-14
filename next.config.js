import WithPWA from "next-pwa";

const withPWA = WithPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  scope: "/",
  sw: "service-worker.js",
});

/**
 * @type {import('next').NextConfig}
 */
// @ts-ignore
const config = withPWA({
  reactStrictMode: true,

  // ✅ REQUIRED for Docker production
  output: "standalone",

  // ── Compression ──────────────────────────────────────────────
  compress: true,

  // ── Remove "X-Powered-By: Next.js" header (minor info leak) ──
  poweredByHeader: false,

  // ── Image optimisation: AVIF first, WebP fallback ────────────
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // ── HTTP response headers ────────────────────────────────────
  async headers() {
    return [
      {
        // Aggressively cache static assets (fonts, images, scripts)
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache WebM video previews for 7 days
        source: "/assets/:path*.webm",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
      {
        // Cache the Spline scene for 7 days
        source: "/assets/scene.splinecode",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
});

export default config;

