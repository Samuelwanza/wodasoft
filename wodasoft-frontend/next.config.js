/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  },
  reactStrictMode: true,
  swcMinify: true,
};

// module.exports = nextConfig

module.exports = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  future: {
    webpack5: true,
  },
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        fs: false,
        path: false,
        os: false,
        child_process: false,
        tls: false,
      },
    };
    return config;
  },
};
