// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


// import withBundleAnalyzer from '@next/bundle-analyzer';

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   swcMinify: true,
//   images: {
//     domains: ['your-image-domain.com'], // Adjust this as needed
//   },
  
//   webpack(config, { isServer }) {
//     if (!isServer) {
//       config.resolve.fallback.fs = false; // Example: Fix for server-only modules in client bundle
//     }
//     return config;
//   },
// };

// const bundleAnalyzer = withBundleAnalyzer({
//   enabled: process.env.ANALYZE === 'true',
// });

// export default bundleAnalyzer(nextConfig);
 
// // next.config.js
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add custom alias for components directory
    config.resolve.alias['@components'] = path.resolve(__dirname, 'components');
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',  // Match all paths from Cloudinary
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false, // Ensure builds fail on TypeScript errors
  },
};

export default nextConfig;






