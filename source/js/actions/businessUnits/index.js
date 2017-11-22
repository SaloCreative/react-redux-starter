import request from 'superagent';
import { aggregator } from '../../api/environment';

import {
  REQUESTING_BUSINESS_UNITS_LIST,
  RECEIVE_BUSINESS_UNITS_LIST
} from '../consts';

export const requestingBusinessUnitList = () => ({
  type: REQUESTING_BUSINESS_UNITS_LIST
});

export const receiveBusinessUnitList = (json) => ({
  type: RECEIVE_BUSINESS_UNITS_LIST,
  data: json,
  last_updated: Date.now()
});

export function fetchBusinessUnitList(language = 'en') {
  return (dispatch) => {
    dispatch(requestingBusinessUnitList());
    request
      .post(aggregator('/core/content/businessUnits'))
      .send({ language })
      .end((err, res) => {
        if (err) {
          if (err.status === 503) {
            setTimeout(() => {
              dispatch(fetchBusinessUnitList(language));
            }, 2000);
          }
        }
        dispatch(receiveBusinessUnitList(res.body));
      });
  };
}