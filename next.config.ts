import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  
  // Security headers configuration for Live Preview
  // Allows your app to be embedded in Contentstack's Live Preview panel
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/(.*)',
        headers: [
          {
            // Content Security Policy - Allow framing from all Contentstack regions
            // This is the modern way to control iframe embedding
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://app.contentstack.com https://eu-app.contentstack.com https://azure-na-app.contentstack.com https://azure-eu-app.contentstack.com https://gcp-na-app.contentstack.com https://gcp-eu-app.contentstack.com http://localhost:3000",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
