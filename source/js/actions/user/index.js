import { CALL_API, getJSON } from '@lushdigital/redux-api-middleware';
import { ENDPOINT, HEADER } from '@lushdigital/api-token-middleware';
 
import { API } from '../../api';
import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED
} from './types';

export const getUser = (id) => ({
  [CALL_API]: {
    endpoint: ENDPOINT(API.AGGREGATOR.USER.replace(':id', id), 'aggregator'),
    headers: HEADER(),
    method: 'GET',
    options: {
      namespace: 'login'
    },
    types: [
      {
        type: FETCH_USER,
        meta: {
          fetching: true
        }
      },
      {
        type: FETCH_USER_SUCCESS,
        payload: (action, state, res) => {
          return getJSON(res);
        },
        meta: {
          fetching: false,
          last_updated: Date.now()
        }
      },
      {
        type: FETCH_USER_FAILED,
        meta: {
          fetching: false,
          last_updated: ''
        },
        payload: (action, state, res) => {
          return getJSON(res);
        }
      }
    ]
  }
});