import { collection, doc, query, onSnapshot, where } from "firebase/firestore";

import { db } from '../index';
import * as Types from '../../types';
import * as Constants from '../../constants';
import * as NotificationUtils from '../../utils/notificationUtils';

export const subscribeToScenariosFromCity = (city: string, callback: (cities: Types.ScenarioSnapshot[]) => void) => {
  const q = query(collection(db, "scenarii"), where("city", "==", city), where("active", "==", true));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    callback(querySnapshot.docs.map(doc => {
      return {
        id: doc.id,
        data: doc.data() as Types.ScenarioDocument
      }
    }));
  }, (error) => {
    console.error(error);
    NotificationUtils.handleError("Une erreur est survenue lors de la récupération des scénarios de \"" + city + "\" ." + Constants.CONTACT_MESSAGE);
  });

  return unsubscribe;
};

export const subscribeToScenario = (scenarioId: string, callback: (cities: undefined | Types.ScenarioDocument) => void) => {
  const docRef = doc(collection(db, "scenarii"), scenarioId);

  return onSnapshot(docRef, (docSnapTmp) => {
    callback(docSnapTmp.exists() ? docSnapTmp.data() as Types.ScenarioDocument : undefined);
  }, (error) => {
    console.error(error);
    NotificationUtils.handleError("Une erreur est survenue lors de la récupération du scénario d'identifiant " + scenarioId + " ." + Constants.CONTACT_MESSAGE);
  });
};