import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    reactStrictMode: true,
    output: "standalone",
    // Esse bloco configura o Next.js Image Optimization (next/image) 
    // para permitir carregar imagens remotamente de domínios externos 
    // 
    // images: {
    //     remotePatterns: [
    //         {
    //             protocol: "https",
    //             hostname: "objectstorage.sa-saopaulo-1.oraclecloud.com",
    //         },
    //     ],
    // },
}

export default nextConfig
