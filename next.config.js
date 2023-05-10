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
  async redirects() {
    return [
      {
        source: '/scenario/apprentiSorcierNantes',
        destination: '/nantes/apprenti-sorcier',
        permanent: true,
      },
      {
        source: '/scenario/testamentannedebretagne',
        destination: '/nantes/testament-anne-de-bretagne',
        permanent: true,
      },
      {
        source: '/scenario/armecachee',
        destination: '/nantes/arme-cachee',
        permanent: true,
      },
      {
        source: '/scenario/tresorcambronne',
        destination: '/nantes/tresor-cambronne',
        permanent: true,
      },
      {
        source: '/scenario/perenoelsurbooke',
        destination: '/nantes/pere-noel-surbooke',
        permanent: true,
      },
    ]
  },
}
