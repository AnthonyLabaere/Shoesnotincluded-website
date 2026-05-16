import { Head, Html, Main, NextScript } from 'next/document'

export default function MyDocument() {
  return (
    <Html lang="fr">
      <Head>
        <link
          href="https://use.fontawesome.com/releases/v6.2.1/css/svg-with-js.css"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
