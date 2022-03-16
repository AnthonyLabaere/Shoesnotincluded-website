import { collection, doc, query, onSnapshot, where } from "firebase/firestore";

import * as Types from '../../types'
import { db } from '../index'

export const subscribeToScenariosFromCity = (city: string, callback: (cities: Types.ScenarioSnapshot[]) => void) => {
  const q = query(collection(db, "scenarii"), where("city", "==", city), where("active", "==", true));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    callback(querySnapshot.docs.map(doc => {
      return {
        id: doc.id,
        data: doc.data() as Types.ScenarioDocument
      }
    }));
  });

  return unsubscribe;
};

export const subscribeToScenario = (scenarioId: string, callback: (cities: undefined | Types.ScenarioDocument) => void) => {
  const docRef = doc(collection(db, "scenarii"), scenarioId);

  return onSnapshot(docRef, (docSnapTmp) => {
    callback(docSnapTmp.exists() ? docSnapTmp.data() as Types.ScenarioDocument : undefined);
  });
};