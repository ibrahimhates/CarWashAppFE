import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getConfig } from '../partials/layout/header-menus/Languages';

i18n
  .use(initReactI18next)
  .init({
    lng: getConfig().selectedLang, // Varsayılan dil
    fallbackLng: 'tr', // Dil bulunamadığında kullanılacak dil
    resources: {
      en: {
        translation: require('./messages/en.json')
      },
      tr: {
        translation: require('./messages/tr.json')
      }
    },
  });

export default i18n;
