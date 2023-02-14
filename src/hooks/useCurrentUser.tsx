import { useEffect } from 'react'

import * as FirebaseAuth from '../firebase/auth'
import * as UserFirestore from '../firebase/firestore/userFirestore'
import useAppDispatch from './useAppDispatch'
import useAppSelector from './useAppSelector'

function useCurrentUser() {
  const dispatch = useAppDispatch()

  const { userAuth } = useAppSelector((state) => state)

  useEffect(() => {
    return FirebaseAuth.subscribeToAuth((userAuthTmp) => {
      dispatch({
        type: 'SET_USER_AUTH',
        payload: userAuthTmp,
      })
    })
  }, [dispatch])

  useEffect(() => {
    if (userAuth != null) {
      const unsubscribe = UserFirestore.subscribeToUser(
        userAuth.uid,
        (userTmp) => {
          dispatch({
            type: 'SET_USER',
            payload: {
              id: userAuth.uid,
              ...userTmp,
            },
          })
        }
      )

      return unsubscribe
    } else {
      dispatch({
        type: 'RESET_USER',
      })
    }
  }, [dispatch, userAuth])
}
export default useCurrentUser
