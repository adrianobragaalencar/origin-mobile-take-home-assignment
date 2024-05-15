import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../assets/en.json';

i18n.use(initReactI18next).init({
  resources: { en },
  fallbackLng: 'en',
  compatibilityJSON: 'v3',
});

export default i18n;
