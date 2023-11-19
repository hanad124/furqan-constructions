/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  webpack: (config) => {
    // Add HTML loader configuration
    config.module.rules.push({
      test: /\.html$/,
      use: [
        {
          loader: "html-loader",
        },
      ],
    });

    // Resolve configuration for handling modules in the server environment
    config.resolve = {
      ...config.resolve,
      fallback: {
        fs: false,
        // path: false,
        os: false,
      },
    };

    // Add additional webpack configuration
    config.resolve.fallback = {
      ...config.resolve.fallback,
      // "mongodb-client-encryption": false,
      aws4: false,
    };

    return config;
  },
};

module.exports = nextConfig;
