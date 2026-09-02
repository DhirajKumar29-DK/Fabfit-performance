import type { NextConfig } from "next";

const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
let backendHostname = 'localhost';
let backendPort = '5000';
let backendProtocol = 'http';

try {
  const url = new URL(backendUrl);
  backendHostname = url.hostname;
  backendPort = url.port || '';
  backendProtocol = url.protocol.replace(':', '');
} catch (e) {
  console.error("Invalid NEXT_PUBLIC_API_URL:", backendUrl);
}

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: backendProtocol as "http" | "https",
        hostname: backendHostname,
        port: backendPort,
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
