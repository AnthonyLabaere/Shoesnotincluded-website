import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';

import * as Types from '../types'
import * as FirebaseAuth from '../firebase/auth';
import * as UserFirestore from '../firebase/firestore/userFirestore'

function useCurrentUser() {
  const [userAuth, setUserAuth] = useState<null | User>();

  useEffect(() => {
    return FirebaseAuth.subscribeToAuth(userAuthTmp => {
      setUserAuth(userAuthTmp);
    });
  }, []);

  const [user, setUser] = useState<Types.UserDocument>();

  useEffect(() => {
    if (userAuth) {
      const unsubscribe = UserFirestore.subscribeToUser(userAuth.uid, userTmp => {
        setUser(userTmp);
      });

      return unsubscribe;
    } else {
      setUser(undefined);
    }
  }, [userAuth]);

  return {
    userAuth,
    user
  }
}
export default useCurrentUser;
