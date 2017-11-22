import i18n from 'i18next';
import Backend from 'i18next-node-fs-backend';
import { LanguageDetector } from 'i18next-express-middleware';
import { languages } from './config/constants';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .init({
    whitelist: languages,
    wait: false,
    fallbackLng: 'en',

    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',

    debug: false,

    load: 'all',

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
      loadPath: 'build/client/locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2
    }
  });

export default i18n;