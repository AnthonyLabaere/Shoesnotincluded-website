import i18n from '../i18n';

const getDefaultShortLocale = () => {
  return i18n.languages[0].split('-')[0];
};

const getShortLocale = () => {
  return i18n.language.split('-')[0];
};

const isLocaleObject = (object: any) => {
  for (const index in i18n.languages) {
    if (Object.prototype.hasOwnProperty.call(object, i18n.languages[index])) {
      return true;
    }
  }
  return false;
};

export const getObjectFromLocale = (object: any) => {
  if (isLocaleObject(object)) {
    // C'est bien un objet internationalisé
    if (Object.prototype.hasOwnProperty.call(object, getShortLocale())) {
      // Retour de l'objet correspondant à la langue du téléphone si celui-ci est présent
      return object[getShortLocale()];
    } 
    else if (Object.prototype.hasOwnProperty.call(object, getDefaultShortLocale())) {
      // Sinon retour de l'objet correspondant à la locale par défaut si celui-ci est présent
      return object[getDefaultShortLocale()];
    }
  }
  // Sinon ou si l'objet n'est pas internationalisé, retour sans changement
  return object;
};
