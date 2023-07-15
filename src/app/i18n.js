import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      rainbowButton: {
        selectMusic: 'Select Music',
        lofi: 'Lo-fi',
        nyanCat: 'Nyan Cat Soundtrack',
        rain: 'Rain',
      },
      imageCarousel: {
        loading: 'Loading...',
      },
    },
  },
  // Add translations for other languages here
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Set the default language here
  fallbackLng: 'en', // Set the fallback language here
  interpolation: {
    escapeValue: false, // React already escapes the values
  },
});

export default i18n;
