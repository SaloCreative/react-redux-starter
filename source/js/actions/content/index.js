import { authToken } from '@lushdigital/api-token-middleware';

// Must keep this relative
import api from '../../store/aggregator';

import {
  REQUESTING_CONTENT_LIST,
  RECEIVE_CONTENT_LIST
} from '../consts';

export const requestingContentList = () => ({
  type: REQUESTING_CONTENT_LIST
});

export const receiveContentList = (contents) => ({
  type: RECEIVE_CONTENT_LIST,
  data: contents,
  last_updated: Date.now()
});

export function fetchContentList(language = 'en', token = authToken && authToken.token) {
  return (dispatch) => {
    dispatch(requestingContentList());
    const payload = {
      language,
      token
    };
    // console.log(`Get content payload => ${ JSON.stringify(payload) }`);
    return api('/content/get', payload).then(data => {
      dispatch(receiveContentList(data));
    }).catch(reason => {
      if (reason.status === 503) {
        setTimeout(() => {
          dispatch(fetchContentList(language, token));
        }, 2000);
      }
    });
  };
}