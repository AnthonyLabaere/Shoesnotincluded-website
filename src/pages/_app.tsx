import '../styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'

import type { AppProps } from 'next/app'
import { Suspense } from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import CookiesBanner from '../gui/components/CookiesBanner'
import Loading from '../gui/components/Loading'
import { wrapper } from '../store'

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <ToastContainer />

        <CookiesBanner />

        <Component {...props.pageProps} />
      </Suspense>
    </Provider>
  )
}

export default App
