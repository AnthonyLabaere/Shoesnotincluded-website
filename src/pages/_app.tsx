import '../styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'

import type { AppProps } from 'next/app'
import { Suspense } from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from 'styled-components'

import CookiesBanner from '../gui/components/CookiesBanner'
import Loading from '../gui/components/Loading'
import { wrapper } from '../store'
import { theme } from '../styles/theme'

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<Loading />}>
          <ToastContainer />

          <CookiesBanner />

          <Component {...props.pageProps} />
        </Suspense>
      </ThemeProvider>
    </Provider>
  )
}

export default App
