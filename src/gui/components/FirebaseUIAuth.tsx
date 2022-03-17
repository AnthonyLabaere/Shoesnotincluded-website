import React from 'react'
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
      provider: "password",
      requireDisplayName: true
    },
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    "google.com",
    {
      provider: "apple.com",
      scopes: ["email", "name"]
    },
    {
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      provider: "facebook.com",
    },
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

const FirebaseUiAuth = () => {
  return (
    <FirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
  );
}

export default FirebaseUiAuth;
