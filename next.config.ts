import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export", // Export application as static files
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
