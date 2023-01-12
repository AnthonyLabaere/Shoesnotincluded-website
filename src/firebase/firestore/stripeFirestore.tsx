import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  onSnapshot,
  orderBy,
  query
} from 'firebase/firestore';

import * as Constants from '../../constants';
import * as Types from '../../types';
import * as NotificationUtils from '../../utils/notificationUtils';
import { db } from '../index';

// https://firebase.google.com/codelabs/stripe-firebase-extensions

const CUSTOMERS_FIRESTORE_COLLECTION = 'stripeCustomers';
const CHECKOUT_SESSIONS_FIRESTORE_SUBCOLLECTION = 'checkout_sessions';
const PAYMENTS_FIRESTORE_SUBCOLLECTION = 'payments';

// Alternative : https://github.com/stripe/stripe-firebase-extensions/tree/next/firestore-stripe-web-sdk
// Mais la création de checkout session ne permet pas de sélectionner une locale à ce jour (23/03/2022)

const getCheckoutSessionsCollectionRef = (userUid: string): CollectionReference<DocumentData> => {
  return collection(
    db,
    CUSTOMERS_FIRESTORE_COLLECTION,
    userUid,
    CHECKOUT_SESSIONS_FIRESTORE_SUBCOLLECTION
  );
};

const getCheckoutSessionDocRef = (
  userUid: string,
  checkoutSessionId: string
): DocumentReference<DocumentData> => {
  return doc(
    db,
    CUSTOMERS_FIRESTORE_COLLECTION,
    userUid,
    CHECKOUT_SESSIONS_FIRESTORE_SUBCOLLECTION,
    checkoutSessionId
  );
};

export const subscribeToCheckoutSession = (
  userUid: string,
  checkoutSessionId: string,
  getSessionCallback: (checkoutSession?: Types.CheckoutSessionDocument) => void
): (() => void) => {
  const checkoutSessionDocRef = getCheckoutSessionDocRef(userUid, checkoutSessionId);

  return onSnapshot(
    checkoutSessionDocRef,
    (checkoutSessionSnap) => {
      if (checkoutSessionSnap.exists()) {
        getSessionCallback(checkoutSessionSnap.data() as Types.CheckoutSessionDocument);
      } else {
        NotificationUtils.handleError(
          "Aucune session de paiement correspondant à l'identifiant " +
            checkoutSessionId +
            '. ' +
            Constants.CONTACT_MESSAGE
        );
      }
    },
    (error) => {
      console.error(error);
      NotificationUtils.handleError(
        "Une erreur est survenue lors de la récupération de votre session de paiement d'identifiant " +
          checkoutSessionId +
          '. ' +
          Constants.CONTACT_MESSAGE
      );
    }
  );
};

const getPaymentCollectionRef = (userUid: string): CollectionReference<DocumentData> => {
  return collection(db, CUSTOMERS_FIRESTORE_COLLECTION, userUid, PAYMENTS_FIRESTORE_SUBCOLLECTION);
};

export const subscribeToPayments = (
  userUid: string,
  callback: (payments: Types.Payment[]) => void
): (() => void) => {
  const paymentCollectionRef = getPaymentCollectionRef(userUid);
  return onSnapshot(
    query(paymentCollectionRef, orderBy('created', 'desc')),
    (snapshot) => {
      const payments: Types.Payment[] = [];
      snapshot.forEach((paymentDocSnap) => {
        const paymentDoc = paymentDocSnap.data();
        payments.push({
          id: paymentDoc.id,
          createdDate: new Date(paymentDoc.created * 1000),
          amount: paymentDoc.amount,
          status: paymentDoc.status,
          consumed: paymentDoc.consumed,
          voucherId: paymentDoc.voucherId
        });
      });
      callback(payments);
    },
    (error) => {
      console.error(error);
      NotificationUtils.handleError(
        'Une erreur est survenue lors de la récupération des paiements associés à votre compte. ' +
          Constants.CONTACT_MESSAGE
      );
    }
  );
};

/**
 * Création d'un utilisateur dans firestore
 *
 * @param userUid l'uid de l'utilisateur au sens authentification firebase (= l'identifiant du document firestore correspondant à l'utilisateur)
 * @param displayName le nom d'affichage de l'utilisateur
 * @param successCallback le callback à appeler en cas de succès
 * @param errorCallback le callback à appeler en cas d'erreur
 */
export const createPayment = (
  userUid: string,
  successCallback: (
    checkoutSessionId: string
  ) => void /*, errorCallback: (message: string) => void */
): void => {
  const checkoutSessionsCollectionRef = getCheckoutSessionsCollectionRef(userUid);

  addDoc(checkoutSessionsCollectionRef, {
    mode: 'payment',
    price: process.env.REACT_APP_stripePriceId,
    allow_promotion_codes: true,
    locale: 'fr',
    success_url: window.location.origin + '/compte',
    cancel_url: window.location.origin + '/compte'
  })
    .then((checkoutSessionRef) => {
      successCallback(checkoutSessionRef.id);
    })
    .catch((error) => {
      console.error(error);
      NotificationUtils.handleError(
        'Une erreur est survenue lors de la création de la session de paiement. ' +
          Constants.CONTACT_MESSAGE
      );
    });
};
