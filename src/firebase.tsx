import { initializeApp } from 'firebase/app'
import { collection, query, onSnapshot, where, getFirestore } from "firebase/firestore";

import * as Types from './types'

// https://firebase.google.com/docs/firestore/query-data/queries#web-version-9_2
// https://travis.media/how-to-use-firebase-with-react/

console.log(process.env.REACT_APP_authDomain)

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
}

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp);

export const subscribeToCities = (callback: (cities: Types.CityDocument[]) => void) => {
  const unsubscribe = onSnapshot(collection(db, "cities"), (querySnapshot) => {
    callback(querySnapshot.docs.map(doc => doc.data() as Types.CityDocument));
  });

  return unsubscribe;
}

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