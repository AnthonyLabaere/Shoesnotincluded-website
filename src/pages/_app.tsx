import '../styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'

import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Suspense, useEffect } from 'react'
import ReactGA from 'react-ga'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from 'styled-components'

import * as Constants from '../constants'
import CookiesBanner from '../gui/components/CookiesBanner'
import Loading from '../gui/components/Loading'
import ScrollToTop from '../gui/components/ScrollToTop'
import { theme } from '../styles/theme'

const App = ({ Component, pageProps }: AppProps) => {
  ReactGA.initialize(Constants.GA_TRACKING_ID)

  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (
      url: string
      // { shallow }: { shallow: boolean }
    ) => {
      ReactGA.send({ hitType: 'pageview', page: url })
      // console.log(
      //   `App is changing to ${url} ${
      //     shallow ? 'with' : 'without'
      //   } shallow routing`
      // )
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<Loading />}>
        <ScrollToTop />

        <ToastContainer />

        <CookiesBanner />

        <Component {...pageProps} />
      </Suspense>
    </ThemeProvider>
  )
}

export default App
