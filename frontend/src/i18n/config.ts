import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ar: {
    translation: require('../locales/ar/translation.json')
  },
  ber: {
    translation: require('../locales/ber/translation.json')
  },
  fr: {
    translation: require('../locales/fr/translation.json')
  },
  en: {
    translation: require('../locales/en/translation.json')
  },
  es: {
    translation: require('../locales/es/translation.json')
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('userLanguage') || 'ar',
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
