/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
    images: {
        domains: ['lh3.googleusercontent.com','avatars.githubusercontent.com','cdn.vectorstock.com','t4.ftcdn.net','firebasestorage.googleapis.com'],
      },
      webpack(config) {
        config.experiments = {
          ...config.experiments,
          topLevelAwait: true,
        }
        return config
      }
};

export default nextConfig;
