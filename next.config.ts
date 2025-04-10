import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export", // Export application as static files
    images:{
        remotePatterns: [{
            protocol: 'https',
            hostname: 'ssimages2025.s3.us-east-2.amazonaws.com',
            pathname: '/**',
        }],
        unoptimized: true,
       
    }
};

export default nextConfig;
