import Head from 'next/head'

import useCurrentUser from '@/src/hooks/useCurrentUser'

import Footer from '../../gui/components/footer'
import Navbar from '../../gui/components/navbar'

interface LayoutProps {
  meta: {
    title: string
    description: string
  }
  noIndex?: boolean
  children: React.ReactElement
}

export default function Layout({ meta, children, noIndex }: LayoutProps) {
  useCurrentUser(true)

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        {noIndex === true && <meta name="robots" content="noindex,nofollow" />}
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        {/* <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" /> */}
      </Head>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}
