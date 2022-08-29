/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["www.gravatar.com", 
              "localhost", 
              "ec2-18-218-166-207.us-east-2.compute.amazonaws.com"
            ]
  }
}

module.exports = nextConfig
