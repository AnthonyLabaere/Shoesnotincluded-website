import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { auth } from '../../../firebase'
import { ContentContainer } from '../../components/common'
import Button from '../../components/button'
import { InnerPageContainer, PageContainer, ContentPageContainer } from '../../components/pageContainer';
import { User } from 'firebase/auth';

const AccountContentContainer = styled(ContentContainer)`
  display: flex;
  align-items: center;
  justify-content: center;

  * {
    text-align: center;
  }
`

const LogoutButton = styled(Button)`
  width: 50%;
  background-color: ${({ theme }) => theme.colors.reds[0]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.black};
  }
`
// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    // firebase.auth.EmailAuthProvider.PROVIDER_ID,
    "password",
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    "google.com",
    "apple.com",
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    "facebook.com"
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

const Account = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver();
  }, []);

  return (
    <PageContainer>
      <InnerPageContainer>
        <ContentPageContainer coloredBackground>
          <ContentContainer>
            {
              !isSignedIn ? <h1>Connexion</h1> : <h1>Mon compte</h1>
            }
          </ContentContainer>
        </ContentPageContainer>
        <ContentPageContainer>
          <AccountContentContainer>
            {
              !isSignedIn ?
                <>
                  <h2>Veuillez vous connecter ou vous créer un compte :</h2>
                  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
                </>
                :
                <>
                  <h2>Bonjour {(auth.currentUser as User).displayName}, bienvenue dans votre espace personnel.</h2>
                  <LogoutButton onClick={() => auth.signOut()}>Déconnexion</LogoutButton>
                </>
            }
          </AccountContentContainer>
        </ContentPageContainer>
      </InnerPageContainer>
    </PageContainer>
  );
}

export default Account;
