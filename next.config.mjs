/** @type {import('next').NextConfig} */
const config = {
  distDir: process.env.LUMO_ISOLATED_CACHE === "1" ? ".next-live" : ".next",
  turbopack: { root: process.cwd() },
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  devIndicators: false,
};
export default config;
