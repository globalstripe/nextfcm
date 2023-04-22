/** @type {import('next').NextConfig} */
const withOffline = require("next-offline");

const nextConfig = {
  reactStrictMode: false,
};

module.exports = withOffline(nextConfig);
