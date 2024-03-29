import { httpsCallable } from 'firebase/functions'

import * as Constants from '../../constants'
import * as NotificationUtils from '../../utils/notificationUtils'
import { functions } from '../index'

export const consumeVoucherCard = (
  voucherCardId: string,
  validationCode: string,
  callback: (voucherId: string) => void,
  errorCallback: () => void
): void => {
  const consumeVoucherCardFunction = httpsCallable(
    functions,
    'consumeVoucherCard'
  )
  consumeVoucherCardFunction({ voucherCardId, validationCode })
    .then((result) => {
      const data: { voucherId: string } = result.data as { voucherId: string }
      callback(data.voucherId)
    })
    .catch((error) => {
      // Getting the Error details.
      const code = error.code

      if (code === 'functions/unauthenticated') {
        NotificationUtils.handleMessage(
          'Vous devez vous connecter à votre compte avant pouvoir demander à valider votre carte. ' +
            Constants.CONTACT_MESSAGE
        )
      } else if (code === 'functions/permission-denied') {
        NotificationUtils.handleMessage(
          "Vous devez valider l'adresse mail associée à votre compte avant de pouvoir demander à valider votre carte. " +
            Constants.CONTACT_MESSAGE
        )
      } else if (code === 'functions/invalid-argument') {
        NotificationUtils.handleMessage(
          'Une erreur technique est survenue lors de tentative de validation de votre carte. ' +
            Constants.CONTACT_MESSAGE
        )
      } else if (code === 'functions/not-found') {
        NotificationUtils.handleMessage(
          "L'identifiant de la carte renseigné n'existe pas ou n'est pas connu de nos systèmes. " +
            Constants.CONTACT_MESSAGE
        )
      } else if (code === 'functions/resource-exhausted') {
        NotificationUtils.handleMessage(
          'La carte renseignée a déjà été utilisée. ' +
            Constants.CONTACT_MESSAGE
        )
      } else if (code === 'functions/aborted') {
        // FIXME : problème de sécurité potentiel sur la carte de bon d'achat - limiter les essais
        NotificationUtils.handleMessage(
          'Le code de validation associé à la carte ne correspond pas. ' +
            Constants.CONTACT_MESSAGE
        )
      } else {
        NotificationUtils.handleError(
          'Une erreur inconnue est survenue lors de la tentative de validation de votre carte. ' +
            Constants.CONTACT_MESSAGE
        )
      }

      errorCallback()
    })
}

export const contact = (
  lastName: string,
  firstName: string,
  email: string,
  subject: string,
  message: string,
  callback: () => void,
  errorCallback: () => void
): void => {
  const contactFunction = httpsCallable(functions, 'contact')
  contactFunction({ lastName, firstName, email, subject, message })
    .then(() => {
      callback()
    })
    .catch((error) => {
      // Getting the Error details.
      const code = error.code

      if (code === 'functions/invalid-argument') {
        NotificationUtils.handleMessage(
          "Une erreur technique est survenue lors de l'envoi du formulaire. " +
            Constants.CONTACT_MESSAGE
        )
      } else {
        NotificationUtils.handleError(
          "Une erreur inconnue est survenue lors de l'envoi du formulaire. " +
            Constants.CONTACT_MESSAGE
        )
      }

      errorCallback()
    })
}
