import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';

import * as Constants from '../../constants';
import * as Types from '../../types';
import * as NotificationUtils from '../../utils/notificationUtils';
import { db } from '../index';

export const subscribeToScenariosFromCity = (
  city: string,
  callback: (cities: Types.ScenarioSnapshot[]) => void
): (() => void) => {
  const q = query(
    collection(db, 'scenarii'),
    where('city', '==', city),
    where('active', '==', true)
  );

  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      callback(
        querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data() as Types.ScenarioDocument
          };
        })
      );
    },
    (error) => {
      console.error(error);
      NotificationUtils.handleError(
        'Une erreur est survenue lors de la récupération des scénarios de "' +
          city +
          '" .' +
          Constants.CONTACT_MESSAGE
      );
    }
  );

  return unsubscribe;
};

export const subscribeToScenario = (
  scenarioId: string,
  callback: (cities: undefined | Types.ScenarioDocument) => void
): (() => void) => {
  const docRef = doc(collection(db, 'scenarii'), scenarioId);

  return onSnapshot(
    docRef,
    (docSnapTmp) => {
      callback(docSnapTmp.exists() ? (docSnapTmp.data() as Types.ScenarioDocument) : undefined);
    },
    (error) => {
      console.error(error);
      NotificationUtils.handleError(
        "Une erreur est survenue lors de la récupération du scénario d'identifiant " +
          scenarioId +
          ' .' +
          Constants.CONTACT_MESSAGE
      );
    }
  );
};
