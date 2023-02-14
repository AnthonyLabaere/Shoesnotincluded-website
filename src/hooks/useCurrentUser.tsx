import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'

import * as FirebaseAuth from '../firebase/auth'
import * as UserFirestore from '../firebase/firestore/userFirestore'
import { resetUser, setUser } from '../store/userSlice'
import useAppDispatch from './useAppDispatch'

const useCurrentUser = (): { userAuth: null | User } => {
  const dispatch = useAppDispatch()

  const [userAuth, setUserAuth] = useState<null | User>(null)

  useEffect(() => {
    return FirebaseAuth.subscribeToAuth((userAuthTmp) => {
      setUserAuth(userAuthTmp)
      if (userAuthTmp == null) {
        dispatch(resetUser())
      }
    })
  }, [dispatch])

  useEffect(() => {
    if (userAuth != null) {
      const unsubscribe = UserFirestore.subscribeToUser(
        userAuth.uid,
        (userTmp) => {
          dispatch(
            setUser({
              id: userAuth.uid,
              displayName: userTmp?.displayName,
            })
          )
        }
      )

      return unsubscribe
    }
  }, [dispatch, userAuth])

  return {
    userAuth,
  }
}
export default useCurrentUser
