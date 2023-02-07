import 'firebaseui/dist/firebaseui.css'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'firebaseui'
import { useEffect, useRef, useState } from 'react'

interface Props {
  // The Firebase UI Web UI Config object.
  // See: https://github.com/firebase/firebaseui-web#configuration
  uiConfig: auth.Config
  // Callback that will be passed the FirebaseUi instance before it is
  // started. This allows access to certain configuration options such as
  // disableAutoSignIn().
  uiCallback?(ui: auth.AuthUI): void
  // The Firebase App auth instance to use.
  firebaseAuth: any // As firebaseui-web
  className?: string
}

const StyledFirebaseAuth = ({
  uiConfig,
  firebaseAuth,
  className,
  uiCallback,
}: Props) => {
  const [firebaseui, setFirebaseui] = useState<
    typeof import('firebaseui') | null
  >(null)
  const [userSignedIn, setUserSignedIn] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    // Firebase UI only works on the Client. So we're loading the package only after
    // the component has mounted, so that this works when doing server-side rendering.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    setFirebaseui(require('firebaseui'))
  }, [])

  useEffect(() => {
    if (firebaseui === null) return

    // Get or Create a firebaseUI instance.
    const firebaseUiWidget =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebaseAuth)
    if (uiConfig.signInFlow === 'popup') firebaseUiWidget.reset()

    // We track the auth state to reset firebaseUi if the user signs out.
    const unregisterAuthObserver = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user && userSignedIn) firebaseUiWidget.reset()
      setUserSignedIn(!!user)
    })

    // Trigger the callback if any was set.
    if (uiCallback) uiCallback(firebaseUiWidget)

    // Render the firebaseUi Widget.
    firebaseUiWidget.start(
      elementRef.current as unknown as string | Element,
      uiConfig
    )

    return () => {
      unregisterAuthObserver()
      firebaseUiWidget.reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseui, uiConfig])

  return <div className={className} ref={elementRef} />
}

export default StyledFirebaseAuth
