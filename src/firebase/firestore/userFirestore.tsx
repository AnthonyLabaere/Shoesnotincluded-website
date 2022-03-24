import { getDoc, doc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";

import { db } from '../index';
import * as Types from '../../types';
import * as Constants from '../../constants';
import * as NotificationUtils from '../../utils/notificationUtils';

const getUserDocRef = (userUid: string) => {
  return doc(db, "users", userUid);
}

export const subscribeToUser = (userUid: string, callback: (user?: Types.UserDocument) => void) => {
  const userDocRef = getUserDocRef(userUid);

  return onSnapshot(userDocRef, userDocSnap => {
    callback(userDocSnap.exists() ? userDocSnap.data() as Types.UserDocument : undefined);
  }, (error) => {
    console.error(error);
    NotificationUtils.handleError("Une erreur est survenue lors de la récupération de votre utilisateur. " + Constants.CONTACT_MESSAGE);
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
export const createUser = (userUid: string, displayName: string) => {
  const userDocRef = getUserDocRef(userUid);

  getDoc(userDocRef)
    .then(userDocSnap => {
      if (!userDocSnap.exists()) {
        setDoc(userDocRef, {
          displayName: displayName,
          consent: serverTimestamp()
        })
          .catch((error) => {
            console.error(error);
            NotificationUtils.handleError("Une erreur est survenue lors de la création de votre utilisateur. " + Constants.CONTACT_MESSAGE);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      NotificationUtils.handleError("Une erreur est survenue lors de la création de votre utilisateur. " + Constants.CONTACT_MESSAGE);
    });


};