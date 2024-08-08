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
    // Example: Add a custom alias or plugin
    config.resolve.alias['@components'] = path.resolve(__dirname, 'components');
    
    // Ensure you are not adding unsupported cache settings
    // Avoid complex cache configurations if they lead to errors

    return config;
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

export default nextConfig;





