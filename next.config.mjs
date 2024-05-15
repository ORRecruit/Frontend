/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'orrstorage.blob.core.windows.net',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
