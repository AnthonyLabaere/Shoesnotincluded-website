import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'

import Layout from '@/src/gui/components/layout'

import * as Constants from '../../constants'
import { auth } from '../../firebase'
import * as FirebaseAuth from '../../firebase/auth'
import * as StripeFirestore from '../../firebase/firestore/stripeFirestore'
import * as UserFirestore from '../../firebase/firestore/userFirestore'
import Button from '../../gui/components/button'
import { ContentContainer, StyledLink } from '../../gui/components/common'
import FirebaseUiAuth from '../../gui/components/FirebaseUIAuth'
import Modal from '../../gui/components/Modal'
import {
  ContentPageContainer,
  InnerPageContainer,
  PageContainer,
} from '../../gui/components/pageContainer'
import useCurrentUser from '../../hooks/useCurrentUser'
import * as Types from '../../types'
import * as NotificationUtils from '../../utils/notificationUtils'
import * as StripeUtils from '../../utils/stripeUtils'

const AccountContentContainer = styled(ContentContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const PaymentHistory = styled.div`
  margin: 50px;
`

const PaymentRow = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`

const PaymentRowHeaderElement = styled.div<{ flex?: number }>`
  flex: ${({ flex = 1 }: { flex?: number }) => flex};
  margin: 5px;
  text-align: left;

  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.tablet}) {
    text-align: center;
  }
`

const PaymentRowElement = styled.div<{ flex?: number }>`
  flex: ${({ flex = 1 }: { flex?: number }) => flex};
  margin: 5px;
  text-align: left;

  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.tablet}) {
    text-align: center;
  }
`

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.tablet}) {
    flex-direction: column;
  }
`

const DeleteOrLogoutButton = styled(Button)`
  flex: 1;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.tablet}) {
    width: 100%;
  }
`

const DeleteButton = styled(DeleteOrLogoutButton)`
  background-color: ${({ theme }) => theme.colors.reds[0]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.black};
  }
`

interface AccountProps {
  previousPage: null | string
}

const Account = ({ previousPage }: AccountProps): React.ReactElement => {
  const router = useRouter()

  const isMobile = useMediaQuery({ maxWidth: Constants.DEVICE_SIZES.tablet })

  const [loading, setLoading] = useState(true)

  const { userAuth, user } = useCurrentUser()

  const optionalRedirectToAccount = (): void => {
    if (previousPage != null) {
      router.push(`../${previousPage}`)
    }
  }

  const getTitlePrefix = (): string => {
    if (previousPage != null) {
      if (previousPage === 'achat') {
        return 'Pour acheter une partie, v'
      } else if (previousPage === 'validation-carte') {
        return 'Pour valider votre carte, v'
      }
    }
    return 'V'
  }

  useEffect(() => {
    if (userAuth !== undefined) {
      if (userAuth !== null) {
        setLoadingUser(true)
      }
      setLoading(false)
    }
  }, [userAuth])

  // Booléen indiquant que l'utilisateur doit être rafraîchit pour vérifier si le champ emailVerified a été mis à jour
  const [reloadEmailVerified, setReloadEmailVerified] = useState(false)

  // Synchronisation avec le champ emailVerified de l'utilisateur
  useEffect(() => {
    if (userAuth !== undefined && userAuth != null && reloadEmailVerified) {
      const timerTmp = setInterval(() => {
        FirebaseAuth.reloadCurrentUser((userAuthTmp) => {
          if (userAuthTmp === null || userAuthTmp?.emailVerified) {
            setReloadEmailVerified(false)
            window.clearInterval(timerTmp)

            // Redirection éventuelle dans le cas où l'utilisateur a eu besoin de vérifier son adresse mail (email ou Facebook)
            optionalRedirectToAccount()
          }
        })
      }, 5000)

      return () => {
        window.clearInterval(timerTmp)
      }
    }
  }, [userAuth, reloadEmailVerified])

  const [loadingUser, setLoadingUser] = useState(false)

  const [userVoucherCardHistoryDocuments, setUserVoucherCardHistoryDocuments] =
    useState<Types.UserVoucherCardHistoryDocument[]>([])

  useEffect(() => {
    if (user != null) {
      setLoadingUser(false)

      // Synchronisation de l'historique des cartes de bon pour une partie validées par l'utilisateur
      return UserFirestore.subscribeToVoucherCardHistoryDocument(
        user.id,
        setUserVoucherCardHistoryDocuments
      )
    }
  }, [user])

  const [payments, setPayments] = useState<Types.Payment[]>()

  useEffect(() => {
    if (userAuth !== undefined && userAuth !== null) {
      return StripeFirestore.subscribeToPayments(
        userAuth.uid,
        (paymentsTmp) => {
          setPayments(paymentsTmp)
        }
      )
    }
  }, [userAuth])

  const meta = {
    title: 'Mon compte et mes bons d&apos;achat - ShoesNotIncluded',
    description:
      "Accédez à votre compte utilisateur ShoesNotIncluded pour consulter vos achats et vos bons d'achats associées à vos parties d'escape game en extérieur.",
  }

  const [displayDeleteAccountModal, setDisplayDeleteAccountModal] =
    useState(false)

  if (userAuth == null || user == null) {
    return (
      <Layout meta={meta} noIndex>
        <PageContainer>
          <InnerPageContainer>
            <ContentPageContainer coloredBackground>
              <ContentContainer>
                <h1>Connexion</h1>
              </ContentContainer>
            </ContentPageContainer>
            <ContentPageContainer>
              <AccountContentContainer>
                {!loading && !loadingUser ? (
                  <>
                    <h2>
                      {getTitlePrefix()}euillez vous connecter ou vous créer un
                      compte :
                    </h2>
                    <FirebaseUiAuth
                      signInSuccessWithAuthResultCallback={(
                        authResult: any
                      ) => {
                        const authResultUser = authResult.user

                        if (authResult.additionalUserInfo.isNewUser === true) {
                          setLoadingUser(true)

                          UserFirestore.createUser(
                            authResultUser.uid,
                            authResultUser.displayName != null
                              ? authResultUser.displayName
                              : 'John Doe'
                          )

                          if (authResultUser.emailVerified !== true) {
                            FirebaseAuth.sendEmailVerification(() => {
                              setReloadEmailVerified(true)
                            })
                          } else {
                            // Redirection éventuelle dans le cas où l'utilisateur n'a pas besoin de vérifier son adresse mail (Google ou Apple)
                            optionalRedirectToAccount()
                          }
                        } else {
                          // Redirection éventuelle dans le cas où l'utilisateur avait déjà un compte
                          optionalRedirectToAccount()
                        }

                        // Pas de redirection
                        return false
                      }}
                    />
                    <span>
                      ⚠ Attention, les adresses en @free.fr ne sont pour
                      l&apos;instant pas compatibles avec nos systèmes. Merci
                      d&apos;en choisir une autre ou de{' '}
                      <StyledLink href="/contact">nous contacter</StyledLink>.
                    </span>
                  </>
                ) : (
                  <h2>Chargement du compte en cours...</h2>
                )}
              </AccountContentContainer>
            </ContentPageContainer>
          </InnerPageContainer>
        </PageContainer>
      </Layout>
    )
  }

  return (
    <Layout meta={meta}>
      <PageContainer>
        <InnerPageContainer>
          <ContentPageContainer coloredBackground>
            <ContentContainer>
              <h1>Mon compte</h1>
            </ContentContainer>
          </ContentPageContainer>
          <ContentPageContainer>
            <AccountContentContainer>
              <div className="fs-3">
                Bonjour {user.displayName}, bienvenue dans votre espace
                personnel.
              </div>
              {!userAuth.emailVerified && (
                <div className="fs-4">
                  Merci de confirmer votre adresse mail en{' '}
                  <span style={{ fontWeight: 'bold' }}>
                    cliquant sur le lien fourni par mail
                  </span>{' '}
                  à l&apos;adresse mail :
                  <br />
                  <br />
                  {userAuth.email}
                  <br />
                  <br />
                  <br />
                  Pensez à vérifier vos spams ou indésirables. <br />
                  <br />
                  Merci de{' '}
                  <StyledLink href="/contact">nous contacter</StyledLink> si
                  vous ne recevez pas le mail.
                </div>
              )}
              {userAuth.emailVerified && (
                <>
                  {userVoucherCardHistoryDocuments.length > 0 && (
                    <PaymentHistory>
                      <div className="fs-3 fw-bold">
                        Historique de validation de carte
                        {userVoucherCardHistoryDocuments.length > 1
                          ? 's'
                          : ''}{' '}
                        :
                      </div>
                      <PaymentRow>
                        {!isMobile && (
                          <PaymentRowHeaderElement
                            className="fs-4 fw-bold"
                            flex={1}
                          >
                            Identifiant{' '}de{' '}la{' '}carte
                          </PaymentRowHeaderElement>
                        )}
                        <PaymentRowHeaderElement
                          className="fs-4 fw-bold"
                          flex={isMobile ? 0.5 : 1}
                        >
                          Date{!isMobile ? ' de validation' : ''}
                        </PaymentRowHeaderElement>
                        <PaymentRowHeaderElement
                          className="fs-4 fw-bold"
                          flex={1}
                        >
                          Bon{' '}d&apos;achat
                        </PaymentRowHeaderElement>
                      </PaymentRow>
                      {userVoucherCardHistoryDocuments.map(
                        (userGameVoucherCardDocumentTmp) => {
                          return (
                            <PaymentRow
                              key={userGameVoucherCardDocumentTmp.voucherCardId}
                            >
                              {!isMobile && (
                                <PaymentRowElement flex={1}>
                                  {userGameVoucherCardDocumentTmp.voucherCardId}
                                </PaymentRowElement>
                              )}
                              <PaymentRowElement flex={isMobile ? 0.5 : 1}>
                                {isMobile
                                  ? userGameVoucherCardDocumentTmp.consumedDate
                                      .toDate()
                                      .toLocaleDateString('fr')
                                  : 'Le ' +
                                    userGameVoucherCardDocumentTmp.consumedDate
                                      .toDate()
                                      .toLocaleDateString('fr') +
                                    ' à ' +
                                    userGameVoucherCardDocumentTmp.consumedDate
                                      .toDate()
                                      .toLocaleTimeString('fr')}
                              </PaymentRowElement>
                              <PaymentRowElement
                                flex={1}
                                style={{
                                  cursor:
                                    userGameVoucherCardDocumentTmp.voucherId !==
                                    undefined
                                      ? 'pointer'
                                      : 'default',
                                }}
                                onClick={() => {
                                  navigator.clipboard
                                    .writeText(
                                      userGameVoucherCardDocumentTmp.voucherId
                                    )
                                    .then(() => {
                                      NotificationUtils.handleMessage(
                                        `Bon d'achat ${userGameVoucherCardDocumentTmp.voucherId?.substring(
                                          0,
                                          3
                                        )}... copié dans le presse-papier.`
                                      )
                                    })
                                  // .catch((e) => {})
                                }}
                              >
                                <div
                                  style={{
                                    display: isMobile ? 'block' : 'flex',
                                  }}
                                >
                                  <FontAwesomeIcon
                                    style={{ marginRight: 5 }}
                                    icon={faCopy}
                                    size="1x"
                                  />
                                  {userGameVoucherCardDocumentTmp.voucherId}
                                </div>
                              </PaymentRowElement>
                            </PaymentRow>
                          )
                        }
                      )}
                    </PaymentHistory>
                  )}
                  <PaymentHistory>
                    <div className="fs-3 fw-bold">
                      Historique d&apos;achat :
                    </div>
                    {payments === undefined ? (
                      <div className="fs-4">
                        Chargement de l&apos;historique en cours...
                      </div>
                    ) : (
                      <>
                        {payments.length === 0 ? (
                          <div className="fs-4">Aucun achat réalisé.</div>
                        ) : (
                          <>
                            <PaymentRow>
                              {!isMobile && (
                                <PaymentRowHeaderElement
                                  className="fs-4 fw-bold"
                                  flex={1}
                                >
                                  Identifiant
                                </PaymentRowHeaderElement>
                              )}
                              <PaymentRowHeaderElement
                                className="fs-4 fw-bold"
                                flex={isMobile ? 0.5 : 1}
                              >
                                Date{!isMobile ? " d'achat" : ''}
                              </PaymentRowHeaderElement>
                              <PaymentRowHeaderElement
                                className="fs-4 fw-bold"
                                flex={0.5}
                              >
                                Statut
                              </PaymentRowHeaderElement>
                              {!isMobile && (
                                <PaymentRowHeaderElement
                                  className="fs-4 fw-bold"
                                  flex={0.5}
                                >
                                  Montant
                                </PaymentRowHeaderElement>
                              )}
                              <PaymentRowHeaderElement
                                className="fs-4 fw-bold"
                                flex={1}
                              >
                                Bon{' '}d&apos;achat
                              </PaymentRowHeaderElement>
                            </PaymentRow>
                            {payments.map((paymentTmp) => {
                              return (
                                <PaymentRow key={paymentTmp.id}>
                                  {!isMobile && (
                                    <PaymentRowElement flex={1}>
                                      {paymentTmp.id}
                                    </PaymentRowElement>
                                  )}
                                  <PaymentRowElement flex={isMobile ? 0.5 : 1}>
                                    {isMobile
                                      ? paymentTmp.createdDate.toLocaleDateString(
                                          'fr'
                                        )
                                      : 'Le ' +
                                        paymentTmp.createdDate.toLocaleDateString(
                                          'fr'
                                        ) +
                                        ' à ' +
                                        paymentTmp.createdDate.toLocaleTimeString(
                                          'fr'
                                        )}
                                  </PaymentRowElement>
                                  <PaymentRowElement flex={0.5}>
                                    {StripeUtils.getPaymentStatusLabel(
                                      paymentTmp.status,
                                      isMobile
                                    )}
                                  </PaymentRowElement>
                                  {!isMobile && (
                                    <PaymentRowElement flex={0.5}>
                                      {StripeUtils.getPaymentAmount(
                                        paymentTmp.amount
                                      )}
                                    </PaymentRowElement>
                                  )}
                                  <PaymentRowElement
                                    flex={1}
                                    style={{
                                      cursor:
                                        paymentTmp.voucherId !== undefined
                                          ? 'pointer'
                                          : 'default',
                                    }}
                                    onClick={() => {
                                      const voucherId = paymentTmp.voucherId
                                      if (voucherId !== undefined) {
                                        navigator.clipboard
                                          .writeText(voucherId)
                                          .then(() => {
                                            NotificationUtils.handleMessage(
                                              `Bon d'achat ${voucherId.substring(
                                                0,
                                                3
                                              )}... copié dans le presse-papier.`
                                            )
                                          })
                                        // .catch((e) => {})
                                      }
                                    }}
                                  >
                                    {paymentTmp.voucherId !== undefined ? (
                                      <div
                                        style={{
                                          display: isMobile ? 'block' : 'flex',
                                        }}
                                      >
                                        <FontAwesomeIcon
                                          style={{ marginRight: 5 }}
                                          icon={faCopy}
                                          size="1x"
                                        />
                                        {paymentTmp.voucherId}
                                      </div>
                                    ) : (
                                      <span>Indisponible</span>
                                    )}
                                  </PaymentRowElement>
                                </PaymentRow>
                              )
                            })}
                          </>
                        )}
                      </>
                    )}
                  </PaymentHistory>
                </>
              )}
              <ButtonsContainer>
                <DeleteOrLogoutButton
                  style={{ flex: 1 }}
                  onClick={() => {
                    void auth.signOut()
                  }}
                >
                  Déconnexion
                </DeleteOrLogoutButton>
                <DeleteButton
                  onClick={() => {
                    setDisplayDeleteAccountModal(true)
                  }}
                >
                  Suppression de votre compte
                </DeleteButton>
              </ButtonsContainer>
            </AccountContentContainer>
          </ContentPageContainer>
        </InnerPageContainer>

        <Modal
          isOpen={displayDeleteAccountModal}
          onClose={() => {
            setDisplayDeleteAccountModal(false)
          }}
          contentLabel="Suppression de votre compte"
        >
          <h2>Suppression de votre compte</h2>
          <div>
            Attention, la suppression de votre compte entraînera la suppression
            de toutes vos données.
          </div>
          <ButtonsContainer>
            <DeleteButton
              onClick={() => {
                FirebaseAuth.deleteCurrentUser(() => {
                  setDisplayDeleteAccountModal(false)
                })
              }}
            >
              Supprimer
            </DeleteButton>
            <DeleteOrLogoutButton
              onClick={() => {
                setDisplayDeleteAccountModal(false)
              }}
            >
              Annuler
            </DeleteOrLogoutButton>
          </ButtonsContainer>
        </Modal>
      </PageContainer>
    </Layout>
  )
}

export async function getServerSideProps(context: any) {
  const previousUrlSplit =
    context.req.headers.referer !== undefined
      ? context.req.headers.referer.split('/')
      : undefined
  return {
    props: {
      previousPage:
        previousUrlSplit !== undefined
          ? previousUrlSplit[previousUrlSplit.length - 1]
          : null,
    },
  }
}

export default Account
