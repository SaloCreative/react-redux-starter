import i18next from 'i18next';
import history from '../config/browserHistory';
import serverHistory from '../config/serverHistory';

export const isBrowser = !!(
  (typeof window !== 'undefined' &&
  window.document && window.document.createElement)
);

export function languageCode() {
  // If en then just split to en rather than en-gb or en-us, otherwise leave it.
  if (i18next.language) {
    return (i18next.language.split('-')[0] === 'en' ? i18next.language.split('-')[0] : i18next.language);
  }
  return 'en';
}

export function goToNotFound() {
  if (isBrowser) {
    return history.push(`/${ languageCode() }/404`, {
      referrer: isBrowser ? window.location.href : ''
    });
  }
  return serverHistory.push(`/${ languageCode() }/404`);
}