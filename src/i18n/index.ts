import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../assets/en.json';

const resources: Resource = { en };

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  compatibilityJSON: 'v3',
});

export default i18n;
