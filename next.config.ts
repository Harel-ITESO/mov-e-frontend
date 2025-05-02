import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   
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
