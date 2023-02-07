import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'

import * as Constants from '../../constants'
import * as Types from '../../types'
import * as NotificationUtils from '../../utils/notificationUtils'
import { db } from '../index'

const getScenariosFromCityQuery = (city: string) => {
  return query(
    collection(db, 'scenarii'),
    where('city', '==', city),
    where('active', '==', true),
    where('secret', '==', false)
  )
}

export const getScenariosFromCity = async (
  city: string
): Promise<Types.ScenarioSnapshot[]> => {
  const q = getScenariosFromCityQuery(city)

  try {
    const docsSnapshots = await getDocs(q)
    return docsSnapshots.docs.map((doc) => {
      return {
        id: doc.id,
        data: doc.data() as Types.ScenarioDocument,
      }
    })
  } catch (error) {
    console.error(error)
    NotificationUtils.handleError(
      'Une erreur est survenue lors de la récupération des scénarios de "' +
        city +
        '" .' +
        Constants.CONTACT_MESSAGE
    )
    return []
  }
}

export const subscribeToScenariosFromCity = (
  city: string,
  callback: (cities: Types.ScenarioSnapshot[]) => void
): (() => void) => {
  const q = getScenariosFromCityQuery(city)

  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      callback(
        querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data() as Types.ScenarioDocument,
          }
        })
      )
    },
    (error) => {
      console.error(error)
      NotificationUtils.handleError(
        'Une erreur est survenue lors de la récupération des scénarios de "' +
          city +
          '" .' +
          Constants.CONTACT_MESSAGE
      )
    }
  )

  return unsubscribe
}

export const getScenario = async (
  scenarioId: string
): Promise<undefined | Types.ScenarioDocument> => {
  const docRef = doc(collection(db, 'scenarii'), scenarioId)

  try {
    const docSnap = await getDoc(docRef)
    return docSnap.data() as Types.ScenarioDocument
  } catch (error) {
    console.error(error)
    NotificationUtils.handleError(
      "Une erreur est survenue lors de la récupération du scénario d'identifiant " +
        scenarioId +
        ' .' +
        Constants.CONTACT_MESSAGE
    )
    return undefined
  }
}

export const subscribeToScenario = (
  scenarioId: string,
  callback: (cities: undefined | Types.ScenarioDocument) => void
): (() => void) => {
  const docRef = doc(collection(db, 'scenarii'), scenarioId)

  return onSnapshot(
    docRef,
    (docSnapTmp) => {
      callback(
        docSnapTmp.exists()
          ? (docSnapTmp.data() as Types.ScenarioDocument)
          : undefined
      )
    },
    (error) => {
      console.error(error)
      NotificationUtils.handleError(
        "Une erreur est survenue lors de la récupération du scénario d'identifiant " +
          scenarioId +
          ' .' +
          Constants.CONTACT_MESSAGE
      )
    }
  )
}
