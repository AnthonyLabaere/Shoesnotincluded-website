import {
  deleteUser,
  reload,
  sendEmailVerification as sendEmailVerificationAuth,
  User
} from 'firebase/auth';

import * as Constants from '../../constants';
import * as NotificationUtils from '../../utils/notificationUtils';
import { auth } from '../';

export const subscribeToAuth = (callback: (authUser: null | User) => void): (() => void) => {
  const unregisterAuthObserver = auth.onAuthStateChanged(callback, (error) => {
    console.error(error);
    NotificationUtils.handleError(
      'Une erreur est survenue lors de la récupération de vos identifiants.' +
        Constants.CONTACT_MESSAGE
    );
  });
  return () => {
    unregisterAuthObserver();
  };
};

export const reloadCurrentUser = (callback: (userAuthTmp: null | User) => void): void => {
  reload(auth.currentUser as User)
    .then(() => {
      callback(auth.currentUser);
    })
    .catch((error) => {
      console.error(error);
      NotificationUtils.handleError(
        'Une erreur est survenue lors du rechargement de votre utilisateur.' +
          Constants.CONTACT_MESSAGE
      );
    });
};

export const deleteCurrentUser = (callback: () => void): void => {
  const user = auth.currentUser;

  if (user != null) {
    deleteUser(user)
      .then(() => {
        callback();
      })
      .catch((error) => {
        console.error(error);
        NotificationUtils.handleError(
          'Une erreur est survenue lors de la suppression de votre utilisateur.' +
            Constants.CONTACT_MESSAGE
        );
      });
  }
};

export const sendEmailVerification = (callback: () => void): void => {
  sendEmailVerificationAuth(auth.currentUser as User)
    .then(callback)
    .catch((error) => {
      console.error(error);
      NotificationUtils.handleError(
        "Une erreur est survenue lors de l'envoi de l'email de vérification de l'adresse mail associée à votre compte." +
          Constants.CONTACT_MESSAGE
      );
    });
};
