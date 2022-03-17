import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';

import * as Types from '../types'
import { auth } from '../firebase';
import * as UserFirestore from '../firebase/firestore/userFirestore'

function useCurrentUser() {
  const [authUser, setAuthUser] = useState<null | User>();

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(userAuthTmp => {
      setAuthUser(userAuthTmp);
    });
    return () => unregisterAuthObserver();
  }, []);

  const [user, setUser] = useState<Types.UserDocument>();

  useEffect(() => {
    if (authUser) {
      const unsubscribe = UserFirestore.subscribeToUser(authUser.uid, userTmp => {
        setUser(userTmp);
      });

      return unsubscribe;
    } else {
      setUser(undefined);
    }
  }, [authUser]);

  return {
    authUser,
    user
  }
}
export default useCurrentUser;
