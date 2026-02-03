import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/user_photos/:path*',
        destination: 'http://localhost:5050/user_photos/:path*',
      },
      {
        source: '/item_photos/:path*',
        destination: 'http://localhost:5050/item_photos/:path*',
      },
    ]
  }
};

export default nextConfig;
