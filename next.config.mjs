/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Specific hostname
      },
      {
        protocol: "https",
        hostname: "shivam-pizza-world.s3.amazonaws.com", // AWS S3 bucket
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com", // Firebase Storage
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Add Cloudinary support
      },
    ],
  },
};

export default nextConfig;
