import '../styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'

import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Suspense, useEffect } from 'react'
import ReactGA from 'react-ga'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from 'styled-components'

import * as Constants from '../constants'
import CookiesBanner from '../gui/components/CookiesBanner'
import Loading from '../gui/components/Loading'
import ScrollToTop from '../gui/components/ScrollToTop'
import { wrapper } from '../store'
import { theme } from '../styles/theme'

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest)

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
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<Loading />}>
          <ScrollToTop />

          <ToastContainer />

          <CookiesBanner />

          <Component {...props.pageProps} />
        </Suspense>
      </ThemeProvider>
    </Provider>
  )
}

export default App
