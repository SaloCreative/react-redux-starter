import request from 'superagent';
import { aggregator } from '../../api/environment';

import {
  REQUESTING_CATEGORIES_LIST,
  RECEIVE_CATEGORIES_LIST
} from '../consts';

export const requestingCategoriesList = () => ({
  type: REQUESTING_CATEGORIES_LIST
});

export const receiveCategoriesList = (json) => ({
  type: RECEIVE_CATEGORIES_LIST,
  data: json,
  last_updated: Date.now()
});

export function fetchCategoriesList(language = 'en') {
  return (dispatch) => {
    request
      .post(aggregator('/core/content/categories'))
      .send({ language })
      .end((err, res) => {
        if (err) {
          if (err.status === 503) {
            setTimeout(() => {
              dispatch(fetchCategoriesList(language));
            }, 2000);
          }
        }
        dispatch(receiveCategoriesList(res.body));
      });
    
    // Requesting Categories list
    dispatch(requestingCategoriesList());
  };
}