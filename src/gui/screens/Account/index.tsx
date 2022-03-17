import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { User } from 'firebase/auth';

import * as Types from '../../../types'
import { auth } from '../../../firebase'
import * as UserFirestore from '../../../firebase/firestore/userFirestore'
import { ContentContainer } from '../../components/common'
import Button from '../../components/button'
import FirebaseUiAuth from '../../components/FirebaseUIAuth'
import { InnerPageContainer, PageContainer, ContentPageContainer } from '../../components/pageContainer';

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
const Account = () => {
  const [loading, setLoading] = useState(false);

  const [authUser, setAuthUser] = useState<User>();

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(userAuthTmp => {
      if (userAuthTmp) {
        setLoading(true);
        UserFirestore.createUser(userAuthTmp.uid, userAuthTmp.displayName ? userAuthTmp.displayName : "John Doe", () => {
          setAuthUser(userAuthTmp);
        });
      } else {
        setLoading(false);
        setAuthUser(undefined);
      }
    });
    return () => unregisterAuthObserver();
  }, []);

  // const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<Types.UserDocument>();

  useEffect(() => {
    if (authUser) {
      const unsubscribe = UserFirestore.subscribeToUser(authUser.uid, userTmp => {
        setUser(userTmp);
      });

      return unsubscribe;
    } else {
      setUser(undefined);
    }
  }, [authUser]);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  return (
    <PageContainer>
      <InnerPageContainer>
        <ContentPageContainer coloredBackground>
          <ContentContainer>
            {
              !user ? <h1>Connexion</h1> : <h1>Mon compte</h1>
            }
          </ContentContainer>
        </ContentPageContainer>
        <ContentPageContainer>
          <AccountContentContainer>
            {
              !user ?
                <>
                  {
                    !loading ? <>
                      <h2>Veuillez vous connecter ou vous créer un compte :</h2>
                      <FirebaseUiAuth />
                    </>
                      : <h2>Chargement du compte en cours...</h2>
                  }
                </>
                :
                <>
                  <h2>Bonjour {user.displayName}, bienvenue dans votre espace personnel.</h2>
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
