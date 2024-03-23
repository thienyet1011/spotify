/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'qkskviqiryrhtjnyiilh.supabase.co'
            }
        ]
    }
};

export default nextConfig;
