import React from 'react';

const defaultValue = {
  locale: 'fr',
  setLocale: (locale: string) => {}
};

export default React.createContext(defaultValue);
