/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '"goldbelly.imgix.net"',
          port: '',
        },
      ],
    },
}


module.exports = nextConfig
