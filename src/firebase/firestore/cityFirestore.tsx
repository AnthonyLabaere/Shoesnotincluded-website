import {
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  or,
  query,
  where,
} from 'firebase/firestore'

import * as Constants from '../../constants'
import * as Types from '../../types'
import * as NotificationUtils from '../../utils/notificationUtils'
import { db } from '../index'

export const getCity = async (
  cityId: string
): Promise<undefined | Types.CityDocument> => {
  const docRef = doc(collection(db, 'cities'), cityId)

  try {
    const docSnap = await getDoc(docRef)
    return docSnap.data() as Types.CityDocument
  } catch (error) {
    console.error(error)
    NotificationUtils.handleError(
      "Une erreur est survenue lors de la récupération de la ville d'identifiant " +
        cityId +
        ' .' +
        Constants.CONTACT_MESSAGE
    )
    return undefined
  }
}

export const subscribeToCity = (
  cityId: string,
  callback: (city: undefined | Types.CityDocument) => void
): (() => void) => {
  const docRef = doc(collection(db, 'cities'), cityId)

  return onSnapshot(
    docRef,
    (docSnapTmp) => {
      callback(
        docSnapTmp.exists()
          ? (docSnapTmp.data() as Types.CityDocument)
          : undefined
      )
    },
    (error) => {
      console.error(error)
      NotificationUtils.handleError(
        "Une erreur est survenue lors de la récupération de la ville d'identifiant " +
          cityId +
          ' .' +
          Constants.CONTACT_MESSAGE
      )
    }
  )
}

const getCitiesQuery = () => {
  if (process.env.NODE_ENV == 'development') {
    return query(
      collection(db, 'cities'),
      or(
        where('active', '==', true),
        and(where('active', '==', false), where('debug', '==', true))
      )
    )
  }

  return query(collection(db, 'cities'), where('active', '==', true))
}

export const getCities = async (): Promise<Types.CitySnapshot[]> => {
  const q = getCitiesQuery()

  try {
    const docsSnapshots = await getDocs(q)
    return docsSnapshots.docs.map((doc) => {
      return {
        id: doc.id,
        data: doc.data() as Types.CityDocument,
      }
    })
  } catch (error) {
    console.error(error)
    NotificationUtils.handleError(
      'Une erreur est survenue lors de la récupération des villes.' +
        Constants.CONTACT_MESSAGE
    )
    return []
  }
}

export const subscribeToCities = (
  callback: (cities: Types.CityDocument[]) => void
): (() => void) => {
  const q = getCitiesQuery()

  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      callback(
        querySnapshot.docs.map((doc) => doc.data() as Types.CityDocument)
      )
    },
    (error) => {
      console.error(error)
      NotificationUtils.handleError(
        'Une erreur est survenue lors des villes.' + Constants.CONTACT_MESSAGE
      )
    }
  )

  return unsubscribe
}
