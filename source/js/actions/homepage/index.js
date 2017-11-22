import request from 'superagent';
import { aggregator } from '../../api/environment';

import {
  REQUESTING_HOMEPAGE,
  RECEIVED_HOMEPAGE
} from '../consts';

export const requestingHomepage = () => ({
  type: REQUESTING_HOMEPAGE
});

export const receiveHomepage = (json) => ({
  type: RECEIVED_HOMEPAGE,
  data: json,
  last_updated: Date.now()
});

export function fetchHomepage(language = 'en') {
  return (dispatch) => {
    dispatch(requestingHomepage());

    request
    .post(aggregator('/core/homepage'))
    .send({ language })
    .end((err, res) => {
      if (err) {
        if (err.status === 503) {
          setTimeout(() => {
            dispatch(fetchHomepage(language));
          }, 2000);
        }
      }
      dispatch(receiveHomepage((res.body)));
    });
  };
}