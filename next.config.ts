import type { NextConfig } from "next";

/**
 * GitHub Pages serves a project site from a subpath
 * (https://<user>.github.io/<repo>), so the deploy workflow sets BASE_PATH.
 * It stays empty locally, which keeps `npm run dev` on "/".
 */
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // The whole site is prerendered, so a static export works.
  output: "export",
  basePath,
  // Next's image optimizer needs a server; the export has none.
  images: { unoptimized: true },
  // Emit out/<route>/index.html so Pages resolves paths without a server.
  trailingSlash: true,
};

export default nextConfig;
