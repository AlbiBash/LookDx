// Static export for GitHub Pages (served under /LookDx). Set NEXT_PUBLIC_BASE_PATH="" for a root domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/LookDx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
