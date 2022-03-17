import { deleteUser, User } from "firebase/auth";

import { auth } from '../'

export const subscribeToAuth = (callback: (authUser: null | User) => void) => {
  const unregisterAuthObserver = auth.onAuthStateChanged(callback);
  return () => unregisterAuthObserver();
}

export const deleteAuth = () => {
  const user = auth.currentUser;

  if (user) {
    deleteUser(user).then(() => {
    }).catch(() => {
      // An error ocurred
      // ...
    });
  }
}