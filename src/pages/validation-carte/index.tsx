import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFormik } from 'formik'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'

import Layout from '@/src/gui/components/layout'
import useAppSelector from '@/src/hooks/useAppSelector'
import useCurrentUser from '@/src/hooks/useCurrentUser'
import { selectUser } from '@/src/store/userSlice'

import * as Constants from '../../constants'
import * as FirebaseFunctions from '../../firebase/functions'
import Button from '../../gui/components/button'
import { ContentContainer, StyledALink } from '../../gui/components/common'
import Marginer from '../../gui/components/marginer'
import Modal from '../../gui/components/Modal'
import {
  ContentPageContainer,
  InnerPageContainer,
  PageContainer,
} from '../../gui/components/pageContainer'
import styles from './index.module.scss'
import * as NotificationUtils from '../../utils/notificationUtils'

const CardValidation = (): React.ReactElement => {
  const validate = (values: {
    voucherCardId?: string
    validationCode?: string
  }): { voucherCardId?: string; validationCode?: string } => {
    const errors: { voucherCardId?: string; validationCode?: string } = {}
    if (values.voucherCardId == null || values.voucherCardId === '') {
      errors.voucherCardId = 'Champ requis'
    }

    if (values.validationCode == null || values.validationCode === '') {
      errors.validationCode = 'Champ requis'
    }
    return errors
  }

  const [voucherId, setVoucherId] = useState<undefined | string>('156')

  const formik = useFormik({
    initialValues: {
      voucherCardId: '',
      validationCode: '',
    },
    validate,
    onSubmit: (values, { setSubmitting }) => {
      FirebaseFunctions.consumeVoucherCard(
        values.voucherCardId,
        values.validationCode,
        (voucherId) => {
          setSubmitting(false)
          setVoucherId(voucherId)
        },
        () => {
          setSubmitting(false)
        }
      )
    },
  })

  const user = useAppSelector(selectUser)

  useEffect(() => {
    if (user == null) {
      Router.push({
        pathname: '/compte',
        query: { validationCarte: true },
      })
    }
  }, [user])

  const [redirectToAccount, setRedirectToAccount] = useState(false)

  useEffect(() => {
    if (redirectToAccount && voucherId !== undefined) {
      setRedirectToAccount(false)
      setVoucherId(undefined)

      Router.push({
        pathname: '/compte',
      })
    }
  }, [redirectToAccount, voucherId])

  return (
    <Layout
      meta={{
        title: 'Escape Game - Carte cadeau - ShoesNotIncluded',
        description:
          "Validez votre carte cadeau et profitez pour une partie d'escape game en extérieur avec ShoesNotIncluded.",
      }}
      noIndex
    >
      <PageContainer>
        <InnerPageContainer>
          <ContentPageContainer coloredBackground>
            <ContentContainer>
              <h1>Validation d&apos;une carte de bon pour une partie</h1>
            </ContentContainer>
          </ContentPageContainer>
          <ContentPageContainer>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
              <div className={styles.inputContainer}>
                {/* TODO : mettre une infobulle (avec un point d'interrogation visible à droite et clickable ?) avec une image pour expliquer où est l'identifiant de la carte */}
                <label className={styles.label} htmlFor="voucherCardId">Identifiant de la carte</label>
                <input className={styles.input} id="voucherCardId"
                  type="text"
                  {...formik.getFieldProps('voucherCardId')}
                />
                <div className={styles.errorMessage}>
                  {formik.touched.voucherCardId === true &&
                  formik.errors.voucherCardId != null
                    ? formik.errors.voucherCardId
                    : ''}
                </div>
              </div>

              <div className={styles.inputContainer}>
                {/* TODO : mettre une infobulle (avec un point d'interrogation visible à droite et clickable ?) avec une image pour expliquer où est le code de validation */}
                <label className={styles.label} htmlFor="validationCode">Code de validation</label>
                <input className={styles.input} id="validationCode"
                  type="text"
                  {...formik.getFieldProps('validationCode')}
                  minLength={4}
                  maxLength={4}
                />
                <div className={styles.errorMessage}>
                  {formik.touched.validationCode === true &&
                  formik.errors.validationCode != null
                    ? formik.errors.validationCode
                    : ''}
                </div>
              </div>

              <Button type="submit" disabled={formik.isSubmitting}>
                {formik.isSubmitting
                  ? 'Validation en cours...'
                  : 'Valider ma carte'}
              </Button>
            </form>
            <Marginer direction="vertical" margin="2em" />
          </ContentPageContainer>
        </InnerPageContainer>

        <Modal
          isOpen={voucherId !== undefined}
          onClose={() => {
            setRedirectToAccount(true)
          }}
          contentLabel="Confirmation de validation"
        >
          <h2>Confirmation de validation</h2>
          <div className={styles.modalTextLine}>Votre carte a été validée.</div>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              navigator.clipboard.writeText(voucherId as string).then(() => {
                NotificationUtils.handleMessage(
                  `Bon d'achat ${(voucherId as string).substring(
                    0,
                    3
                  )}... copié dans le presse-papier.`
                )
              })
              // .catch((e) => {})
            }}
          >
            <div className={styles.modalTextLine}>
              <FontAwesomeIcon
                style={{ marginRight: 5 }}
                icon={faCopy}
                size="1x"
              />
              Votre bon d&apos;achat est le {voucherId}.
            </div>
          </div>
          <ModalTextLine style={{ fontStyle: 'italic' }}>
            Pour l&apos;utiliser :<br />1 - Ouvrez l&apos;application
            ShoesNotIncluded (ou téléchargez-là au préalable sur les stores{' '}
            <StyledALink href={Constants.PLAY_STORE_LINK}>Android</StyledALink>{' '}
            ou{' '}
            <StyledALink href={Constants.APPLE_STORE_LINK}>Apple</StyledALink>).
            <br />
            2 - Sélectionnez un scénario (exemple : Le testament d&apos;Anne de
            Bretagne)
            <br />
            3 - Cliquez sur &quot;Utiliser un bon d&apos;achat&quot;
            <br />
            4 - Renseignez le code du bon d&apos;achat obtenu lors du paiement.
            <br />
          </div>
          <ModalTextLine style={{ marginTop: 25 }}>
            Un mail récapitulatif a été envoyé à l&apos;adresse mail associée à
            votre compte.
          </div>
          <div className={styles.modalButtonsContainer}>
            <Button className={styles.modalButton} onClick={() => {
                setRedirectToAccount(true)
              }}
            >
              Bien compris !
            </Button>
          </div>
        </Modal>
      </PageContainer>
    </Layout>
  )
}

export default CardValidation
