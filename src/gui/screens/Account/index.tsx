import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

import * as Types from "../../../types";
import * as Constants from "../../../constants";
import useCurrentUser from '../../../hooks/useCurrentUser';
import { auth } from '../../../firebase';
import * as FirebaseAuth from '../../../firebase/auth';
import * as StripeFirestore from '../../../firebase/firestore/stripeFirestore';
import * as UserFirestore from '../../../firebase/firestore/userFirestore';
import * as NotificationUtils from "../../../utils/notificationUtils";
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
  flex: 1;
`;

const PaymentRowHeaderElement = styled.h3<{ flex?: number }>`
  flex: ${({ flex = 1 }: { flex?: number }) => flex};
  margin: 5px;
  text-align: left;

  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.tablet}) {
    text-align: center;
  }
`;

const PaymentRowElement = styled.div<{ flex?: number }>`
  flex: ${({ flex = 1 }: { flex?: number }) => flex};
  margin: 5px;
  text-align: left;

  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.tablet}) {
    text-align: center;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.tablet}) {
    flex-direction: column;
  }
`;

const DeleteOrLogoutButton = styled(Button)`
  flex: 1;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.tablet}) {
    width: 100%;
  }
`;

const DeleteButton = styled(DeleteOrLogoutButton)`
  background-color: ${({ theme }) => theme.colors.reds[0]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.black};
  }
`;

interface AccountState {
  fromPayment?: boolean;
  fromCardValidation?: boolean;
}

const Account = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [locationState, setLocationState] = useState<null | AccountState>(null);
  useEffect(() => {
    if (location !== null) {
      setLocationState(location.state as null | AccountState);
    }
  }, [location]);


  const isMobile = useMediaQuery({ maxWidth: Constants.DEVICE_SIZES.tablet });

  const [loading, setLoading] = useState(true);

  const { userAuth, user } = useCurrentUser();

  const optionalRedirectToAccount = (locationState: null | AccountState) => {
    if (locationState !== null) {
      if (locationState.fromPayment === true) {
        navigate("../achat", { replace: true, state: { fromAccount: true } });
      } else if (locationState.fromCardValidation === true) {
        navigate("../validation-carte", { replace: true, state: { fromAccount: true } });
      }
    }
  }

  const getTitlePrefix = (locationState: null | AccountState): string => {
    if (locationState !== null) {
      if (locationState.fromPayment === true) {
        return "Pour acheter une partie, v";
      } else if (locationState.fromCardValidation === true) {
        return "Pour valider votre carte, v";
      }
    }
    return "V";
  }

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

            // Redirection éventuelle dans le cas où l'utilisateur a eu besoin de vérifier son adresse mail (email ou Facebook)
            optionalRedirectToAccount(locationState);
          }
        });
      }, 5000);

      return () => {
        window.clearInterval(timerTmp);
      };
    }
  }, [userAuth, reloadEmailVerified]);

  const [loadingUser, setLoadingUser] = useState(false);

  const [userVoucherCardHistoryDocuments, setUserVoucherCardHistoryDocuments] = useState<Types.UserVoucherCardHistoryDocument[]>([]);

  useEffect(() => {
    if (user) {
      setLoadingUser(false);

      // Synchronisation de l'historique des cartes de bon pour une partie validées par l'utilisateur
      UserFirestore.subscribeToVoucherCardHistoryDocument(user.id, setUserVoucherCardHistoryDocuments);
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
                  <h2>{getTitlePrefix(locationState)}euillez vous connecter ou vous créer un compte :</h2>
                  <FirebaseUiAuth signInSuccessWithAuthResultCallback={(authResult: any) => {
                    const authResultUser = authResult.user;

                    if (authResult.additionalUserInfo.isNewUser) {
                      setLoadingUser(true);

                      UserFirestore.createUser(authResultUser.uid, authResultUser.displayName ? authResultUser.displayName : "John Doe");

                      if (!authResultUser.emailVerified) {
                        FirebaseAuth.sendEmailVerification(() => setReloadEmailVerified(true));
                      } else {
                        // Redirection éventuelle dans le cas où l'utilisateur n'a pas besoin de vérifier son adresse mail (Google ou Apple)
                        optionalRedirectToAccount(locationState);
                      }
                    } else {
                      // Redirection éventuelle dans le cas où l'utilisateur avait déjà un compte
                      optionalRedirectToAccount(locationState);
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
              userAuth.emailVerified && <>
                {
                  userVoucherCardHistoryDocuments.length > 0 &&
                  <PaymentHistory>
                    <h2 style={{ textAlign: 'left' }}>Historique de validation de carte{userVoucherCardHistoryDocuments.length > 1 ? "s" : ""} :</h2>
                    <PaymentRow>
                      {!isMobile && <PaymentRowHeaderElement flex={1}>Identifiant{' '}de{' '}la{' '}carte</PaymentRowHeaderElement>}
                      <PaymentRowHeaderElement flex={isMobile ? 0.5 : 1}>Date{!isMobile ? " de validation" : ""}</PaymentRowHeaderElement>
                      <PaymentRowHeaderElement flex={1}>Bon{' '}d'achat</PaymentRowHeaderElement>
                    </PaymentRow>
                    {
                      userVoucherCardHistoryDocuments.map(userGameVoucherCardDocumentTmp => {
                        return (
                          <PaymentRow key={userGameVoucherCardDocumentTmp.voucherCardId}>
                            {!isMobile && <PaymentRowElement flex={1}>{userGameVoucherCardDocumentTmp.voucherCardId}</PaymentRowElement>}
                            <PaymentRowElement flex={isMobile ? 0.5 : 1}>{isMobile ? userGameVoucherCardDocumentTmp.consumedDate.toDate().toLocaleDateString("fr") : "Le " + userGameVoucherCardDocumentTmp.consumedDate.toDate().toLocaleDateString("fr") + " à " + userGameVoucherCardDocumentTmp.consumedDate.toDate().toLocaleTimeString("fr")}</PaymentRowElement>
                            <PaymentRowElement flex={1} style={{ cursor: userGameVoucherCardDocumentTmp.voucherId !== undefined ? 'pointer' : 'default' }} onClick={() => {
                              navigator.clipboard.writeText(userGameVoucherCardDocumentTmp.voucherId);
                              NotificationUtils.handleMessage(`Bon d'achat ${userGameVoucherCardDocumentTmp.voucherId?.substring(0, 3)}... copié dans le presse-papier.`);
                            }}>
                              <div style={{ display: isMobile ? 'block' : 'flex' }}><FontAwesomeIcon style={{ marginRight: 5 }} icon={faCopy} size="1x" />{userGameVoucherCardDocumentTmp.voucherId}</div>
                            </PaymentRowElement>
                          </PaymentRow>
                        );
                      })
                    }
                  </PaymentHistory>
                }
                <PaymentHistory>
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
                                {!isMobile && <PaymentRowHeaderElement flex={1}>Identifiant</PaymentRowHeaderElement>}
                                <PaymentRowHeaderElement flex={isMobile ? 0.5 : 1}>Date{!isMobile ? " d'achat" : ""}</PaymentRowHeaderElement>
                                <PaymentRowHeaderElement flex={0.5}>Statut</PaymentRowHeaderElement>
                                {!isMobile && <PaymentRowHeaderElement flex={0.5}>Montant</PaymentRowHeaderElement>}
                                <PaymentRowHeaderElement flex={1}>Bon{' '}d'achat</PaymentRowHeaderElement>
                              </PaymentRow>
                              {
                                payments.map(paymentTmp => {
                                  return (
                                    <PaymentRow key={paymentTmp.id}>
                                      {!isMobile && <PaymentRowElement flex={1}>{paymentTmp.id}</PaymentRowElement>}
                                      <PaymentRowElement flex={isMobile ? 0.5 : 1}>{isMobile ? paymentTmp.createdDate.toLocaleDateString("fr") : "Le " + paymentTmp.createdDate.toLocaleDateString("fr") + " à " + paymentTmp.createdDate.toLocaleTimeString("fr")}</PaymentRowElement>
                                      <PaymentRowElement flex={0.5}>{StripeUtils.getPaymentStatusLabel(paymentTmp.status, isMobile)}</PaymentRowElement>
                                      {!isMobile && <PaymentRowElement flex={0.5}>{StripeUtils.getPaymentAmount(paymentTmp.amount)}</PaymentRowElement>}
                                      <PaymentRowElement flex={1} style={{ cursor: paymentTmp.voucherId !== undefined ? 'pointer' : 'default' }} onClick={() => {
                                        if (paymentTmp.voucherId !== undefined) {
                                          navigator.clipboard.writeText(paymentTmp.voucherId);
                                          NotificationUtils.handleMessage(`Bon d'achat ${paymentTmp.voucherId?.substring(0, 3)}... copié dans le presse-papier.`);
                                        }
                                      }}>
                                        {paymentTmp.voucherId !== undefined ? <div style={{ display: isMobile ? 'block' : 'flex' }}><FontAwesomeIcon style={{ marginRight: 5 }} icon={faCopy} size="1x" />{paymentTmp.voucherId}</div> : <span>Indisponible</span>}
                                      </PaymentRowElement>
                                    </PaymentRow>
                                  );
                                })
                              }
                            </>
                        }
                      </>
                  }
                </PaymentHistory>
              </>
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
        <div>Attention, la suppression de votre compte entraînera la suppression de toutes vos données.</div>
        <ButtonsContainer>
          <DeleteButton onClick={() => FirebaseAuth.deleteCurrentUser(() => setDisplayDeleteAccountModal(false))}>Supprimer</DeleteButton>
          <DeleteOrLogoutButton onClick={() => setDisplayDeleteAccountModal(false)}>Annuler</DeleteOrLogoutButton>
        </ButtonsContainer>
      </Modal>

    </PageContainer>
  );
}

export default Account;
