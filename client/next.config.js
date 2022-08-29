/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["www.gravatar.com", 
              "localhost", 
              "ec2-18-225-31-96.us-east-2.compute.amazonaws.com"
            ]
  }
}

module.exports = nextConfig
