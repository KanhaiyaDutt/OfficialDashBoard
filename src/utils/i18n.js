

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import your translation files

// International Languages
import translationEN from './locales/en/translation.json';
import translationML from './locales/ml/translation.json';
import translationOR from './locales/or/translation.json';
import translationKOK from './locales/kok/translation.json';
import translationUR from './locales/ur/translation.json';
import translationSD from './locales/sd/translation.json';
import translationAS from './locales/as/translation.json';
import translationSAT from './locales/sat/translation.json';

// Indian Languages
import translationHI from './locales/hi/translation.json';
import translationBN from './locales/bn/translation.json';
import translationTA from './locales/ta/translation.json';
import translationTE from './locales/te/translation.json';
import translationMR from './locales/mr/translation.json';
import translationGU from './locales/gu/translation.json';
import translationKN from './locales/kn/translation.json';
import translationPA from './locales/pa/translation.json';

// Create a resources object to hold all your translations
const resources = {
  // International Languages
  en: {
    translation: translationEN
  },
  ml: {
    translation: translationML
  },
  or: {
    translation: translationOR
  },
  kok: {
    translation: translationKOK
  },
  ur: {
    translation: translationUR
  },
  sd: {
    translation: translationSD
  },
  as: {
    translation: translationAS
  },
  sat: {
    translation: translationSAT
  },
  // Indian Languages
  hi: {
    translation: translationHI
  },
  bn: {
    translation: translationBN
  },
  ta: {
    translation: translationTA
  },
  te: {
    translation: translationTE
  },
  mr: {
    translation: translationMR
  },
  gu: {
    translation: translationGU
  },
  kn: {
    translation: translationKN
  },
  pa: {
    translation: translationPA
  }
};

i18n
  // Detect user language
//   .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    lng: 'en',
    resources,
    fallbackLng: 'en', // Use 'en' if detected language is not available
    interpolation: {
      escapeValue: false // React already safes from xss
    }
  });

export default i18n;