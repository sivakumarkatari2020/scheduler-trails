//next.config.js
const withImages = require('next-images')

const withTM = require('next-transpile-modules')([
  'antd-mobile',
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withTM(withImages(nextConfig));