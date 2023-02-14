import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'

import * as FirebaseAuth from '../firebase/auth'
import * as UserFirestore from '../firebase/firestore/userFirestore'
import { resetUser, setUser } from '../store/userSlice'
import useAppDispatch from './useAppDispatch'

const useCurrentUser = (withEdition = false): { userAuth: null | User } => {
  const dispatch = useAppDispatch()

  const [userAuth, setUserAuth] = useState<null | User>(null)

  useEffect(() => {
    return FirebaseAuth.subscribeToAuth((userAuthTmp) => {
      setUserAuth(userAuthTmp)
      if (withEdition && userAuthTmp == null) {
        dispatch(resetUser())
      }
    })
  }, [])

  useEffect(() => {
    if (userAuth != null) {
      const unsubscribe = UserFirestore.subscribeToUser(
        userAuth.uid,
        (userTmp) => {
          if (withEdition) {
            dispatch(
              setUser({
                id: userAuth.uid,
                displayName: userTmp?.displayName,
              })
            )
          }
        }
      )

      return unsubscribe
    }
  }, [userAuth])

  return {
    userAuth,
  }
}
export default useCurrentUser
