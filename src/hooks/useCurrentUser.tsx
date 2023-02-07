import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'

import * as FirebaseAuth from '../firebase/auth'
import * as UserFirestore from '../firebase/firestore/userFirestore'
import * as Types from '../types'

function useCurrentUser(): {
  userAuth: undefined | null | User
  user: undefined | Types.UserDocument
} {
  const [userAuth, setUserAuth] = useState<null | User>()

  useEffect(() => {
    return FirebaseAuth.subscribeToAuth((userAuthTmp) => {
      setUserAuth(userAuthTmp)
    })
  }, [])

  const [user, setUser] = useState<Types.UserDocument>()

  useEffect(() => {
    if (userAuth != null) {
      const unsubscribe = UserFirestore.subscribeToUser(
        userAuth.uid,
        (userTmp) => {
          setUser({
            id: userAuth.uid,
            ...userTmp,
          })
        }
      )

      return unsubscribe
    } else {
      setUser(undefined)
    }
  }, [userAuth])

  return {
    userAuth,
    user,
  }
}
export default useCurrentUser
