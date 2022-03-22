import { addDoc, collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";

import * as Types from '../../types';
import { db } from '../index';

const CUSTOMERS_FIRESTORE_COLLECTION = "stripeCustomers";
const CHECKOUT_SESSIONS_FIRESTORE_SUBCOLLECTION = "checkout_sessions";
const PAYMENTS_FIRESTORE_SUBCOLLECTION = "payments";

const getCheckoutSessionsCollectionRef = (userUid: string) => {
  return collection(db, CUSTOMERS_FIRESTORE_COLLECTION, userUid, CHECKOUT_SESSIONS_FIRESTORE_SUBCOLLECTION);
}

const getCheckoutSessionDocRef = (userUid: string, checkoutSessionId: string) => {
  return doc(db, CUSTOMERS_FIRESTORE_COLLECTION, userUid, CHECKOUT_SESSIONS_FIRESTORE_SUBCOLLECTION, checkoutSessionId);
}

export const subscribeToCheckoutSession = (userUid: string, checkoutSessionId: string, callback: (checkoutSession?: Types.CheckoutSessionDocument) => void) => {
  const checkoutSessionDocRef = getCheckoutSessionDocRef(userUid, checkoutSessionId);

  return onSnapshot(checkoutSessionDocRef, checkoutSessionSnap => {
    if (checkoutSessionSnap.exists()) {
      callback(checkoutSessionSnap.data() as Types.CheckoutSessionDocument);
    } else {
      // TODO erreur
    }
  }, () => {
    // TODO erreur
  });
};

const getPaymentCollectionRef = (userUid: string) => {
  return collection(db, CUSTOMERS_FIRESTORE_COLLECTION, userUid, PAYMENTS_FIRESTORE_SUBCOLLECTION);
}

export const subscribeToPayments = (userUid: string, callback: (payments: Types.Payment[]) => void) => {
  const paymentCollectionRef = getPaymentCollectionRef(userUid);
  return onSnapshot(query(paymentCollectionRef, orderBy("created", "desc")), snapshot => {
    const payments: Types.Payment[] = [];
    snapshot.forEach(paymentDocSnap => {
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
  }, () => {
    // TODO erreur
  });
};

/**
 * Création d'un utilisateur dans firestore
 *
 * @param userUid l'uid de l'utilisateur au sens authentification firebase (= l'identifiant du document firestore correspondant à l'utilisateur)
 * @param displayName le nom d'affichage de l'utilisateur
 * @param successCallback le callback à appeler en cas de succès
 * @param errorCallback le callback à appeler en cas d'erreur
 */
export const createPayment = (userUid: string, successCallback: (checkoutSessionId: string) => void/*, errorCallback: (message: string) => void*/) => {
  const checkoutSessionsCollectionRef = getCheckoutSessionsCollectionRef(userUid);

  addDoc(checkoutSessionsCollectionRef, {
    mode: "payment",
    price: "price_1Kfg5lBHqoS8JnzKUpmrVj4x",
    locale: "fr",
    success_url: window.location.origin + "/compte",
    cancel_url: window.location.origin + "/compte",
  })
    .then((checkoutSessionRef) => {
      // console.log("checkoutSessionRefId", checkoutSessionRef.id);
      successCallback(checkoutSessionRef.id);
    })
    .catch((error) => {
      console.error(error);
      // TODO
      // errorCallback(FirestoreUtils.getErrorMessage(error, 'de la création du compte ' + displayName));
    });
};