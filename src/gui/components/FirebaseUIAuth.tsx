import React from 'react'

import { auth } from '../../firebase'
import styles from './FirebaseUIAuth.module.scss'
import StyledFirebaseAuth from './StyledFirebaseAuth'

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    {
      // firebase.auth.EmailAuthProvider.PROVIDER_ID,
      provider: 'password',
      requireDisplayName: true,
    },
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    'google.com',
    {
      provider: 'apple.com',
      scopes: ['email', 'name'],
    },
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
  // Terms of service url.
  tosUrl: 'https://www.shoesnotincluded.fr/cgu-cgv',
  // Privacy policy url.
  privacyPolicyUrl: 'https://www.shoesnotincluded.fr/confidentialite',
}

interface FirebaseUiAuthProps {
  signInSuccessWithAuthResultCallback?: (authResult: any) => boolean
}

const FirebaseUiAuth = ({
  signInSuccessWithAuthResultCallback,
}: FirebaseUiAuthProps): React.ReactElement => {
  return (
    <StyledFirebaseAuth
      className={styles.loginExternalWrapper}
      uiConfig={{
        ...uiConfig,
        callbacks: {
          ...uiConfig.callbacks,
          signInSuccessWithAuthResult:
            signInSuccessWithAuthResultCallback !== undefined
              ? signInSuccessWithAuthResultCallback
              : uiConfig.callbacks.signInSuccessWithAuthResult,
        },
      }}
      firebaseAuth={auth}
    />
  )
}

export default FirebaseUiAuth
