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

const getScenariosFromCitiesQuery = (cities: string[]) => {
  return query(
    collection(db, 'scenarii'),
    where('city', 'in', cities),
    where('active', '==', true),
    where('secret', '==', false)
  )
}

export const getScenariosFromCities = async (
  cities: string[]
): Promise<Types.ScenarioSnapshot[]> => {
  const q = getScenariosFromCitiesQuery(cities)

  try {
    const docsSnapshots = await getDocs(q)
    return docsSnapshots.docs
      .filter((doc) => (doc.data() as Types.ScenarioDocument).url !== undefined)
      .map((doc) => {
        return {
          id: doc.id,
          data: doc.data() as Types.ScenarioDocument,
        }
      })
  } catch (error) {
    console.error(error)
    NotificationUtils.handleError(
      'Une erreur est survenue lors de la récupération des scénarios de "' +
        cities +
        '" .' +
        Constants.CONTACT_MESSAGE
    )
    return []
  }
}

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
    return docsSnapshots.docs
      .filter((doc) => (doc.data() as Types.ScenarioDocument).url !== undefined)
      .map((doc) => {
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
        querySnapshot.docs
          .filter(
            (doc) => (doc.data() as Types.ScenarioDocument).url !== undefined
          )
          .map((doc) => {
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

const getScenariosByCityAndUrlQuery = (cityId: string, scenarioUrl: string) => {
  return query(
    collection(db, 'scenarii'),
    where('city', '==', cityId),
    where('url', '==', scenarioUrl)
  )
}

export const getScenarioByCityAndUrl = async (
  cityId: string,
  scenarioUrl: string
): Promise<undefined | Types.ScenarioSnapshot> => {
  const q = getScenariosByCityAndUrlQuery(cityId, scenarioUrl)

  try {
    const docsSnapshots = await getDocs(q)
    if (docsSnapshots.empty) {
      NotificationUtils.handleError(
        "Une erreur est survenue lors de la récupération du scénario d'url " +
          scenarioUrl +
          ' de la ville ' +
          cityId +
          ' .' +
          Constants.CONTACT_MESSAGE
      )
      return undefined
    }

    return {
      id: docsSnapshots.docs[0].id,
      data: docsSnapshots.docs[0].data() as Types.ScenarioDocument,
    }
  } catch (error) {
    console.error(error)
    NotificationUtils.handleError(
      "Une erreur est survenue lors de la récupération du scénario d'url " +
        scenarioUrl +
        ' de la ville ' +
        cityId +
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
