import { deleteUser, User, reload, sendEmailVerification as sendEmailVerificationAuth } from "firebase/auth";

import { auth } from '../'

export const subscribeToAuth = (callback: (authUser: null | User) => void) => {
  const unregisterAuthObserver = auth.onAuthStateChanged(callback, /* TODO */);
  return () => unregisterAuthObserver();
}

export const reloadCurrentUser = (successCallback: (userAuthTmp: null | User) => void/*, errorCallback: (message: string) => void*/) => {
  reload(auth.currentUser as User)
    .then(() => {
      successCallback(auth.currentUser);
    })
    .catch(() => {
      // TODO
    });
}

export const deleteCurrentUser = (callback: () => void) => {
  const user = auth.currentUser;

  if (user) {
    deleteUser(user)
      .then(() => {
        callback();
      }).catch(() => {
        // TODO
      });
  }
}

export const sendEmailVerification = () => {
  return sendEmailVerificationAuth(auth.currentUser as User);
}