import { getDoc, doc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";

import * as Types from '../../types';
import { db } from '../index';

const getUserDocRef = (userUid: string) => {
  return doc(db, "users", userUid);
}

export const subscribeToUser = (userUid: string, callback: (user?: Types.UserDocument) => void) => {
  const userDocRef = getUserDocRef(userUid);

  return onSnapshot(userDocRef, userDocSnap => {
    callback(userDocSnap.exists() ? userDocSnap.data() as Types.UserDocument : undefined);
  }, () => {
    // TODO
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
export const createUser = (userUid: string, displayName: string/*, successCallback: () => void, errorCallback: (message: string) => void*/) => {
  const userDocRef = getUserDocRef(userUid);

  getDoc(userDocRef)
    .then(userDocSnap => {
      if (!userDocSnap.exists()) {
        setDoc(userDocRef, {
          displayName: displayName,
          consent: serverTimestamp()
        })
          .then(() => {
            // successCallback();
          })
          .catch((error) => {
            console.error(error);
            // TODO
            // errorCallback(FirestoreUtils.getErrorMessage(error, 'de la création du compte ' + displayName));
          });
      } else {
        // successCallback();
      }
    })
    .catch((error) => {
      console.error(error);
      // TODO
      // errorCallback(FirestoreUtils.getErrorMessage(error, 'de la création du compte ' + displayName));
    });


};