// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })

// module.exports = withBundleAnalyzer({
//   env: {
//     NEXT_PUBLIC_ENV: 'PRODUCTION',
//   },
// })

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./src'],
    prependData: `@import "~@styles/variables.scss";`,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
}
