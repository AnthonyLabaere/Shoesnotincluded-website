import { deleteUser, User, reload, sendEmailVerification as sendEmailVerificationAuth } from "firebase/auth";

import { auth } from '../';
import * as Constants from '../../constants';
import * as NotificationUtils from '../../utils/notificationUtils';

export const subscribeToAuth = (callback: (authUser: null | User) => void) => {
  const unregisterAuthObserver = auth.onAuthStateChanged(callback, (error) => {
    console.error(error);
    NotificationUtils.handleError("Une erreur est survenue lors de la récupération de vos identifiants." + Constants.CONTACT_MESSAGE);
  });
  return () => unregisterAuthObserver();
}

export const reloadCurrentUser = (callback: (userAuthTmp: null | User) => void) => {
  reload(auth.currentUser as User)
    .then(() => {
      callback(auth.currentUser);
    })
    .catch((error) => {
      console.error(error);
      NotificationUtils.handleError("Une erreur est survenue lors du rechargement de votre utilisateur." + Constants.CONTACT_MESSAGE);
    });
}

export const deleteCurrentUser = (callback: () => void) => {
  const user = auth.currentUser;

  if (user) {
    deleteUser(user)
      .then(() => {
        callback();
      }).catch((error) => {
        console.error(error);
        NotificationUtils.handleError("Une erreur est survenue lors de la suppression de votre utilisateur." + Constants.CONTACT_MESSAGE);
      });
  }
}

export const sendEmailVerification = (callback: () => void) => {
  sendEmailVerificationAuth(auth.currentUser as User)
    .then(callback)
    .catch((error) => {
      console.error(error);
      NotificationUtils.handleError("Une erreur est survenue lors de l'envoi de l'email de vérification de l'adresse mail associée à votre compte." + Constants.CONTACT_MESSAGE);
    });
}