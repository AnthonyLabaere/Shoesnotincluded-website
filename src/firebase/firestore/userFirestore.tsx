import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc
} from 'firebase/firestore';

import * as Constants from '../../constants';
import * as Types from '../../types';
import * as NotificationUtils from '../../utils/notificationUtils';
import { db } from '../index';
/**
 * Récupération de la référence d'un utilisateur
 *
 * @param userUid l'uid de l'utilisateur au sens authentification firebase (= l'identifiant du document firestore correspondant à l'utilisateur)
 * @returns la référence de l'utilisateur
 */
const userDocumentReference = (userUid: string): DocumentReference<DocumentData> => {
  return doc(db, Constants.USERS_FIRESTORE_COLLECTION, userUid);
};

export const subscribeToUser = (
  userUid: string,
  callback: (user?: Types.UserDocument) => void
): (() => void) => {
  const userDocRef = userDocumentReference(userUid);

  return onSnapshot(
    userDocRef,
    (userDocSnap) => {
      callback(userDocSnap.exists() ? (userDocSnap.data() as Types.UserDocument) : undefined);
    },
    (error) => {
      console.error(error);
      NotificationUtils.handleError(
        'Une erreur est survenue lors de la récupération de votre utilisateur. ' +
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
export const createUser = (userUid: string, displayName: string): void => {
  const userDocRef = userDocumentReference(userUid);

  getDoc(userDocRef)
    .then((userDocSnap) => {
      if (!userDocSnap.exists()) {
        setDoc(userDocRef, {
          displayName,
          consent: serverTimestamp()
        }).catch((error) => {
          console.error(error);
          NotificationUtils.handleError(
            'Une erreur est survenue lors de la création de votre utilisateur. ' +
              Constants.CONTACT_MESSAGE
          );
        });
      }
    })
    .catch((error) => {
      console.error(error);
      NotificationUtils.handleError(
        'Une erreur est survenue lors de la création de votre utilisateur. ' +
          Constants.CONTACT_MESSAGE
      );
    });
};

/**
 * Récupération de la référence de l'historique de validation de carte de bon pour une partie d'un utilisateur
 *
 * @param userUid l'uid de l'utilisateur au sens authentification firebase (= l'identifiant du document firestore correspondant à l'utilisateur)
 * @returns la référence de l'utilisateur
 */
const userVoucherCardHistoryCollectionReference = (
  userUid: string
): CollectionReference<DocumentData> => {
  return collection(
    db,
    `${Constants.USERS_FIRESTORE_COLLECTION}/${userUid}/${Constants.USER_VOUCHER_CARD_HISTORY_FIRESTORE_COLLECTION}`
  );
};

/**
 * Souscription aux modifications sur l'historique de validation de carte de bon pour une partie d'un utilisateur stocké dans firestore
 *
 * @param userUid l'identifiant du document firestore correspondant au scénario
 * @param callback la fonction à appeler lors de modification sur le scénario
 * @returns la méthode de désinscription
 */
export const subscribeToVoucherCardHistoryDocument = (
  userUid: string,
  callback: (userGameHistoryDocuments: Types.UserVoucherCardHistoryDocument[]) => void
): (() => void) => {
  const voucherCardHistoryCollectionRef = userVoucherCardHistoryCollectionReference(userUid);

  return onSnapshot(
    voucherCardHistoryCollectionRef,
    (voucherCardHistoryDocsSnap) => {
      callback(
        voucherCardHistoryDocsSnap.docs.map(
          (doc) => doc.data() as Types.UserVoucherCardHistoryDocument
        )
      );
    },
    (error) => {
      console.error(error);
      NotificationUtils.handleError(
        "Une erreur est survenue lors de la récupération de l'historique de validation de carte de votre utilisateur. " +
          Constants.CONTACT_MESSAGE
      );
    }
  );
};
