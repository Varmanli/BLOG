/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "strapi-blog.liara.run",
        port: "",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
