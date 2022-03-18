import { collection, onSnapshot } from "firebase/firestore";

import * as Types from '../../types'
import { db } from '../index'

export const subscribeToCities = (callback: (cities: Types.CityDocument[]) => void) => {
  const unsubscribe = onSnapshot(collection(db, "cities"), (querySnapshot) => {
    callback(querySnapshot.docs.map(doc => doc.data() as Types.CityDocument));
  }, () => {
    // TODO
  });

  return unsubscribe;
}