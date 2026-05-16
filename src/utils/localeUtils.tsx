// import i18n from '../i18n';

const getDefaultShortLocale = (): string => {
  // return i18n.languages[0].split('-')[0];
  return 'fr'
}

const getShortLocale = (): string => {
  // return i18n.language.split('-')[0];
  return 'fr'
}

const isLocaleObject = (object: unknown): boolean => {
  if (object === null || typeof object !== 'object') return false
  // return i18n.languages.some((language) =>
  //   Object.prototype.hasOwnProperty.call(object, language)
  // )
  return ['fr'].some((language) =>
    Object.prototype.hasOwnProperty.call(object, language)
  )
}

export const getObjectFromLocale = (object: unknown): unknown => {
  if (isLocaleObject(object)) {
    const localeObject = object as Record<string, unknown>
    // C'est bien un objet internationalisé
    if (Object.prototype.hasOwnProperty.call(localeObject, getShortLocale())) {
      // Retour de l'objet correspondant à la langue du téléphone si celui-ci est présent
      return localeObject[getShortLocale()]
    } else if (
      Object.prototype.hasOwnProperty.call(localeObject, getDefaultShortLocale())
    ) {
      // Sinon retour de l'objet correspondant à la locale par défaut si celui-ci est présent
      return localeObject[getDefaultShortLocale()]
    }
  }
  // Sinon ou si l'objet n'est pas internationalisé, retour sans changement
  return object
}
