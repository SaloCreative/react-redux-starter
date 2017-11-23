import { CALL_API, getJSON } from '@aftonbladet/redux-api-middleware';
import { API } from '../../api';

import {
  TEST_PHOTOS_FETCH,
  TEST_PHOTOS_SUCCESS,
  TEST_PHOTOS_FAILED
} from './types';

export const photosFetch = () => ({
  [CALL_API]: {
    endpoint: API.TEST.PHOTOS,
    method: 'GET',
    types: [
      {
        type: TEST_PHOTOS_FETCH
      },
      {
        type: TEST_PHOTOS_SUCCESS,
        payload: (action, state, res) => {
          return getJSON(res).then((json) => {
            return json;
          });
        },
        meta: {
          last_updated: Date.now()
        }
      },
      {
        type: TEST_PHOTOS_FAILED
      }
    ]
  }
});