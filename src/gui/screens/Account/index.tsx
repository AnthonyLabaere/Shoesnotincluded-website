import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import * as Types from "../../../types";
import useCurrentUser from '../../../hooks/useCurrentUser';
import { auth } from '../../../firebase';
import * as FirebaseAuth from '../../../firebase/auth';
import * as StripeFirestore from '../../../firebase/firestore/stripeFirestore';
import * as UserFirestore from '../../../firebase/firestore/userFirestore';
import * as StripeUtils from "../../../utils/stripeUtils";
import { ContentContainer, StyledLink } from '../../components/common';
import Modal from '../../components/Modal';
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
`;

const PaymentHistory = styled.div`
  margin: 50px;
`;

const PaymentRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const PaymentRowHeaderElement = styled.h3`
  flex: 1;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: left;
`;

const PaymentRowElement = styled.h4`
  flex: 1;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: left;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    flex-direction: column;
  }
`;

const DeleteOrLogoutButton = styled(Button)`
  flex: 1;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    width: 100%;
  }
`;

const DeleteButton = styled(DeleteOrLogoutButton)`
  background-color: ${({ theme }) => theme.colors.reds[0]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.black};
  }
`;

const Account = () => {
  const [loading, setLoading] = useState(true);

  const { userAuth, user } = useCurrentUser();

  useEffect(() => {
    if (userAuth !== undefined) {
      if (userAuth !== null) {
        setLoadingUser(true);
      }
      setLoading(false);
    }
  }, [userAuth]);

  // Booléen indiquant que l'utilisateur doit être rafraîchit pour vérifier si le champ emailVerified a été mis à jour
  const [reloadEmailVerified, setReloadEmailVerified] = useState(false);

  // Synchronisation avec le champ emailVerified de l'utilisateur
  useEffect(() => {
    if (userAuth !== undefined && userAuth != null && reloadEmailVerified === true) {
      const timerTmp = setInterval(() => {
        FirebaseAuth.reloadCurrentUser((userAuthTmp) => {
          if (userAuthTmp === null || (userAuthTmp !== null && userAuthTmp.emailVerified === true)) {
            setReloadEmailVerified(false);
            window.clearInterval(timerTmp);
          }
        });
      }, 5000);

      return () => {
        window.clearInterval(timerTmp);
      };
    }
  }, [userAuth, reloadEmailVerified]);

  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    if (user) {
      setLoadingUser(false);
    }
  }, [user]);

  const [payments, setPayments] = useState<Types.Payment[]>();

  useEffect(() => {
    if (userAuth !== undefined && userAuth !== null) {
      return StripeFirestore.subscribeToPayments(userAuth.uid, paymentsTmp => {
        setPayments(paymentsTmp);
      });
    }
  }, [userAuth]);

  const [displayDeleteAccountModal, setDisplayDeleteAccountModal] = useState(false);

  if (!userAuth || !user) {
    return (
      <PageContainer>
        <InnerPageContainer>
          <ContentPageContainer coloredBackground>
            <ContentContainer>
              <h1>Connexion</h1>
            </ContentContainer>
          </ContentPageContainer>
          <ContentPageContainer>
            <AccountContentContainer>
              {
                (!loading && !loadingUser) ? <>
                  <h2>Veuillez vous connecter ou vous créer un compte :</h2>
                  <FirebaseUiAuth signInSuccessWithAuthResultCallback={(authResult: any) => {
                    const authResultUser = authResult.user;

                    if (authResult.additionalUserInfo.isNewUser) {
                      setLoadingUser(true);

                      UserFirestore.createUser(authResultUser.uid, authResultUser.displayName ? authResultUser.displayName : "John Doe");

                      if (!authResultUser.emailVerified) {
                        FirebaseAuth.sendEmailVerification(() => setReloadEmailVerified(true));
                      }
                    }

                    // Pas de redirection
                    return false;
                  }} />
                  <span>⚠ Attention, les adresses en @free.fr ne sont pour l'instant pas compatibles avec nos systèmes. Merci d'en choisir une autre ou de <StyledLink to="/contact">nous contacter</StyledLink>.</span>
                </>
                  : <h2>Chargement du compte en cours...</h2>
              }
            </AccountContentContainer>
          </ContentPageContainer>
        </InnerPageContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <InnerPageContainer>
        <ContentPageContainer coloredBackground>
          <ContentContainer>
            <h1>Mon compte</h1>
          </ContentContainer>
        </ContentPageContainer>
        <ContentPageContainer>
          <AccountContentContainer>
            <h2>Bonjour {user.displayName}, bienvenue dans votre espace personnel.</h2>
            {
              !userAuth.emailVerified &&
              <h3>
                Merci de confirmer votre adresse mail en <span style={{ fontWeight: 'bold' }}>cliquant sur le lien fourni par mail</span> à l'adresse mail :
                <br /><br />
                {userAuth.email}<br /><br /><br />
                Pensez à vérifier vos spams ou indésirables. <br /><br />
                Merci de <StyledLink to="/contact">nous contacter</StyledLink> si vous ne recevez pas le mail.</h3>
            }
            {
              userAuth.emailVerified && <PaymentHistory>
                <h2 style={{ textAlign: 'left' }}>Historique d'achat :</h2>
                {
                  payments === undefined ? <h3>Chargement de l'historique en cours...</h3>
                    :
                    <>
                      {
                        payments.length === 0 ? <h3 style={{ textAlign: 'left' }}>Aucun achat réalisé.</h3>
                          :
                          <>
                            <PaymentRow>
                              <PaymentRowHeaderElement>Identifiant</PaymentRowHeaderElement>
                              <PaymentRowHeaderElement>Date d'achat</PaymentRowHeaderElement>
                              <PaymentRowHeaderElement>Statut</PaymentRowHeaderElement>
                              <PaymentRowHeaderElement>Montant</PaymentRowHeaderElement>
                              <PaymentRowHeaderElement>Bon d'achat</PaymentRowHeaderElement>
                            </PaymentRow>
                            {
                              payments.map(paymentTmp => {
                                return (
                                  <PaymentRow key={paymentTmp.id}>
                                    <PaymentRowElement>{paymentTmp.id}</PaymentRowElement>
                                    <PaymentRowElement>{'Le ' + paymentTmp.createdDate.toLocaleDateString("fr") + ' à ' + paymentTmp.createdDate.toLocaleTimeString("fr")}</PaymentRowElement>
                                    <PaymentRowElement>{StripeUtils.getPaymentStatusLabel(paymentTmp.status)}</PaymentRowElement>
                                    <PaymentRowElement>{StripeUtils.getPaymentAmount(paymentTmp.amount)}</PaymentRowElement>
                                    <PaymentRowElement>{paymentTmp.voucherId !== undefined ? paymentTmp.voucherId : "Indisponible"}</PaymentRowElement>
                                  </PaymentRow>
                                );
                              })
                            }
                          </>
                      }
                    </>
                }
              </PaymentHistory>
            }
            <ButtonsContainer>
              <DeleteOrLogoutButton style={{ flex: 1 }} onClick={() => auth.signOut()}>Déconnexion</DeleteOrLogoutButton>
              <DeleteButton onClick={() => setDisplayDeleteAccountModal(true)}>Suppression de votre compte</DeleteButton>
            </ButtonsContainer>
          </AccountContentContainer>
        </ContentPageContainer>
      </InnerPageContainer>

      <Modal
        isOpen={displayDeleteAccountModal}
        onClose={() => setDisplayDeleteAccountModal(false)}
        contentLabel="Suppression de votre compte">
        <h2>Suppression de votre compte</h2>
        <div>⚠ Attention, la suppression de votre compte entraînera la suppression de toutes vos données.</div>
        <div style={{ display: 'flex', flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <DeleteButton onClick={() => FirebaseAuth.deleteCurrentUser(() => setDisplayDeleteAccountModal(false))}>Supprimer</DeleteButton>
          <DeleteOrLogoutButton onClick={() => setDisplayDeleteAccountModal(false)}>Annuler</DeleteOrLogoutButton>
        </div>
      </Modal>

    </PageContainer>
  );
}

export default Account;
