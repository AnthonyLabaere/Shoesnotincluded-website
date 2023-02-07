import { useRouter } from 'next/router'
import { useEffect } from 'react'

const ScrollToTop = (): null => {
  const { pathname } = useRouter()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTop
