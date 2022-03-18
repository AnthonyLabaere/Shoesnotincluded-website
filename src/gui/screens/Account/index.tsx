import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import useCurrentUser from '../../../hooks/useCurrentUser';
import { auth } from '../../../firebase';
import * as FirebaseAuth from '../../../firebase/auth';
import * as UserFirestore from '../../../firebase/firestore/userFirestore';
import { ContentContainer } from '../../components/common';
import Button from '../../components/button';
import FirebaseUiAuth from '../../components/FirebaseUIAuth';
import { InnerPageContainer, PageContainer, ContentPageContainer } from '../../components/pageContainer';

const AccountContentContainer = styled(ContentContainer)`
  display: flex;
  align-items: center;
  justify-content: center;

  * {
    text-align: center;
  }
`

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    flex-direction: column;
  }
`

const DeleteOrLogoutButton = styled(Button)`
  flex: 1;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    width: 100%;
  }
`

const DeleteButton = styled(DeleteOrLogoutButton)`
  background-color: ${({ theme }) => theme.colors.reds[0]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.black};
  }
`

const Account = () => {
  const [loading, setLoading] = useState(false);

  const { user } = useCurrentUser();

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
                      <FirebaseUiAuth signInSuccessWithAuthResultCallback={(authResult: any) => {
                        if (authResult.additionalUserInfo.isNewUser) {
                          setLoading(true);
                          UserFirestore.createUser(authResult.user.uid, authResult.user.displayName ? authResult.user.displayName : "John Doe");
                        }

                        // Pas de redirection
                        return false;
                      }} />
                    </>
                      : <h2>Chargement du compte en cours...</h2>
                  }
                </>
                :
                <>
                  <h2>Bonjour {user.displayName}, bienvenue dans votre espace personnel.</h2>
                  <ButtonsContainer>
                    <DeleteOrLogoutButton style={{ flex: 1 }} onClick={() => auth.signOut()}>Déconnexion</DeleteOrLogoutButton>
                    <DeleteButton onClick={() => FirebaseAuth.deleteAuth()}>Suppression de votre compte</DeleteButton>
                  </ButtonsContainer>
                </>
            }
          </AccountContentContainer>
        </ContentPageContainer>
      </InnerPageContainer>
    </PageContainer>
  );
}

export default Account;
