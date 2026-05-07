import { Head, Html, Main, NextScript } from 'next/document'
import * as React from 'react'

export default function MyDocument(): React.ReactElement {
  return (
    <Html lang="fr">
      <Head>
        <link
          href="https://use.fontawesome.com/releases/v6.2.1/css/svg-with-js.css"
          rel="stylesheet"
        ></link>
      </Head>
      <body>
        <script>0</script>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
