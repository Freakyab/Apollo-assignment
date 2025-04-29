/** @type {import('next').NextConfig} */
const nextConfig = {
  //add domain for images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
    ],
  },
};

export default nextConfig;
