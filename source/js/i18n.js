import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import Cache from 'i18next-localstorage-cache';
import LanguageDetector from 'i18next-browser-languagedetector';
import { languages } from './config/constants';

i18n
  .use(XHR)
  .use(Cache)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    wait: true, // globally set to wait for loaded translations in translate hoc

    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',

    debug: false,

    cache: {
      enabled: true
    },

    load: 'all',

    lngWhitelist: languages,

    lowerCaseLng: true,

    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ',',
      format(value, format, lng) {
        if (format === 'uppercase') return value.toUpperCase();
        return value;
      }
    },

    backend: {
      // for all available options read the backend's repository readme file
      loadPath: '/client/locales/{{lng}}/{{ns}}.json'
    }
  });

export default i18n;