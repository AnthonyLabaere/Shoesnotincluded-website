import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Router from 'next/router'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import Layout from '@/src/gui/components/layout'
import useCurrentUser from '@/src/hooks/useCurrentUser'
import { selectUser } from '@/src/store/userSlice'

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
import styles from './index.module.scss'
import useAppSelector from '../../hooks/useAppSelector'
import * as Types from '../../types'
import * as NotificationUtils from '../../utils/notificationUtils'
import * as StripeUtils from '../../utils/stripeUtils'
import styles from './compte.module.scss'

interface AccountProps {
  previousPage: null | string
}

const Account = ({ previousPage }: AccountProps): React.ReactElement => {
  const router = useRouter()

  const isMobile = useMediaQuery({ maxWidth: Constants.DEVICE_SIZES.tablet })

  const [loading, setLoading] = useState(true)

  const { userAuth } = useCurrentUser()

  const user = useAppSelector(selectUser)

  const [redirectToAccount, setRedirectToAccount] = useState(false)

  useEffect(() => {
    if (redirectToAccount && user !== undefined) {
      if (router.query.achat === 'true') {
        router.push('../achat')
      } else if (router.query.validationCarte === 'true') {
        router.push('../validation-carte')
      }
    }
  }, [redirectToAccount, user])

  const getTitlePrefix = (): string => {
    if (previousPage != null) {
      if (router.query.achat === 'true') {
        return 'Pour acheter une partie, v'
      } else if (router.query.validationCarte === 'true') {
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
            setRedirectToAccount(true)
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
    title: "Mon compte et mes bons d'achat - ShoesNotIncluded",
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
              <ContentContainer className={styles.accountContentContainer}>
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
                            setRedirectToAccount(true)
                          }
                        } else {
                          // Redirection éventuelle dans le cas où l'utilisateur avait déjà un compte
                          setRedirectToAccount(true)
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
              </ContentContainer>
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
            <ContentContainer className={styles.accountContentContainer}>
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
                    <div className={styles.paymentHistory}>
                      <div className="fs-3 fw-bold">
                        Historique de validation de carte
                        {userVoucherCardHistoryDocuments.length > 1
                          ? 's'
                          : ''}{' '}
                        :
                      </div>
                      <div className={styles.paymentRow} className={styles.paymentRow}>
                        <div className={styles.paymentRowHeaderElement} className={`fs-4 fw-bold ${styles.identifiant}`}
                        >
                          Identifiant{' '}de{' '}la{' '}carte
                        </div>
                        <div className={styles.paymentRowHeaderElement} className={`fs-4 fw-bold ${styles.date} ${styles.validationDateHeader}`}
                        />
                        <div className={styles.paymentRowHeaderElement} className="fs-4 fw-bold">
                          Bon{' '}d&apos;achat
                        </div>
                      </div>
                      {userVoucherCardHistoryDocuments.map(
                        (userGameVoucherCardDocumentTmp) => {
                          return (
                            <div className={styles.paymentRow} className={styles.paymentRow}
                              key={userGameVoucherCardDocumentTmp.voucherCardId}
                            >
                              <div className={styles.paymentRowElement} className={styles.identifiant}>
                                {userGameVoucherCardDocumentTmp.voucherCardId}
                              </div>
                              <div className={styles.paymentRowElement} className={styles.date}>
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
                              </div>
                              <div className={styles.paymentRowElement} style={{
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
                                <div>
                                  <FontAwesomeIcon
                                    style={{ marginRight: 5 }}
                                    icon={faCopy}
                                    size="1x"
                                  />
                                  {userGameVoucherCardDocumentTmp.voucherId}
                                </div>
                              </div>
                            </div>
                          )
                        }
                      )}
                    </div>
                  )}
                  <div className={styles.paymentHistory}>
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
                            <div className={styles.paymentRow} className={styles.paymentRow}>
                              <div className={styles.paymentRowHeaderElement} className={`fs-4 fw-bold ${styles.identifiant}`}
                              >
                                Identifiant
                              </div>
                              <div className={styles.paymentRowHeaderElement} className={`fs-4 fw-bold ${styles.date} ${styles.paymentDateHeader}`}
                              />
                              <div className={styles.paymentRowHeaderElement} className={`fs-4 fw-bold ${styles.status}`}
                              >
                                Statut
                              </div>
                              <div className={styles.paymentRowHeaderElement} className={`fs-4 fw-bold ${styles.amount}`}
                              >
                                Montant
                              </div>
                              <div className={styles.paymentRowHeaderElement} className="fs-4 fw-bold">
                                Bon{' '}d&apos;achat
                              </div>
                            </div>
                            {payments.map((paymentTmp) => {
                              return (
                                <div className={styles.paymentRow} className={styles.paymentRow}
                                  key={paymentTmp.id}
                                >
                                  <div className={styles.paymentRowElement} className={styles.identifiant}
                                  >
                                    {paymentTmp.id}
                                  </div>
                                  <div className={styles.paymentRowElement} className={styles.date}>
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
                                  </div>
                                  <div className={styles.paymentRowElement} className={styles.status}>
                                    {StripeUtils.getPaymentStatusLabel(
                                      paymentTmp.status,
                                      isMobile
                                    )}
                                  </div>
                                  <div className={styles.paymentRowElement} className={styles.amount}>
                                    {StripeUtils.getPaymentAmount(
                                      paymentTmp.amount
                                    )}
                                  </div>
                                  <div className={styles.paymentRowElement} style={{
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
                                      <div>
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
                                  </div>
                                </div>
                              )
                            })}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </>
              )}
              <div className={styles.buttonsContainer}>
                <Button className={styles.deleteOrLogoutButton} style={{ flex: 1 }}
                  onClick={() => {
                    void auth.signOut()
                  }}
                >
                  Déconnexion
                </Button>
                <Button className={styles.deleteButton} onClick={() => {
                    setDisplayDeleteAccountModal(true)
                  }}
                >
                  Suppression de votre compte
                </Button>
              </div>
            </ContentContainer>
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
          <div className={styles.buttonsContainer}>
            <Button className={styles.deleteButton} onClick={() => {
                FirebaseAuth.deleteCurrentUser(() => {
                  setDisplayDeleteAccountModal(false)
                })
              }}
            >
              Supprimer
            </Button>
            <Button className={styles.deleteOrLogoutButton} onClick={() => {
                setDisplayDeleteAccountModal(false)
              }}
            >
              Annuler
            </Button>
          </div>
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
