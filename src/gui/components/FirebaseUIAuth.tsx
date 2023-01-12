import React from 'react';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';

import { auth } from '../../firebase';

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    {
      // firebase.auth.EmailAuthProvider.PROVIDER_ID,
      provider: 'password',
      requireDisplayName: true
    },
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    'google.com',
    {
      provider: 'apple.com',
      scopes: ['email', 'name']
    },
    {
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      provider: 'facebook.com'
    }
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  },
  // Terms of service url.
  tosUrl: 'https://www.shoesnotincluded.fr/cgu-cgv',
  // Privacy policy url.
  privacyPolicyUrl: 'https://www.shoesnotincluded.fr/confidentialite'
};

interface FirebaseUiAuthProps {
  signInSuccessWithAuthResultCallback?: (authResult: any) => boolean;
}

const FirebaseUiAuth = ({
  signInSuccessWithAuthResultCallback
}: FirebaseUiAuthProps): React.ReactElement => {
  return (
    <FirebaseAuth
      uiConfig={{
        ...uiConfig,
        callbacks: {
          ...uiConfig.callbacks,
          signInSuccessWithAuthResult:
            signInSuccessWithAuthResultCallback !== undefined
              ? signInSuccessWithAuthResultCallback
              : uiConfig.callbacks.signInSuccessWithAuthResult
        }
      }}
      firebaseAuth={auth}
    />
  );
};

export default FirebaseUiAuth;
