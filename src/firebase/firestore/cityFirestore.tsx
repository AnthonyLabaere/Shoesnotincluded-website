import { collection, onSnapshot } from "firebase/firestore";

import { db } from '../index';
import * as Types from '../../types';
import * as Constants from '../../constants';
import * as NotificationUtils from '../../utils/notificationUtils';

export const subscribeToCities = (callback: (cities: Types.CityDocument[]) => void) => {
  const unsubscribe = onSnapshot(collection(db, "cities"), (querySnapshot) => {
    callback(querySnapshot.docs.map(doc => doc.data() as Types.CityDocument));
  }, (error) => {
    console.error(error);
    NotificationUtils.handleError("Une erreur est survenue lors des villes." + Constants.CONTACT_MESSAGE);
  });

  return unsubscribe;
}