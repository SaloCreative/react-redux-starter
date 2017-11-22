import request from 'superagent';
import { aggregator } from '../../api/environment';

import {
  REQUESTING_CREATIVE_SHOWCASE_CATEGORIES,
  RECEIVED_CREATIVE_SHOWCASE_CATEGORIES
} from '../consts';

export const requestingCreativeShowcaseCategories = () => ({
  type: REQUESTING_CREATIVE_SHOWCASE_CATEGORIES
});

export const receivedCreativeShowcaseCategories = (json) => ({
  type: RECEIVED_CREATIVE_SHOWCASE_CATEGORIES,
  data: json,
  last_updated: Date.now()
});

export function fetchCreativeShowcaseCategories(language = 'en') {
  return (dispatch) => {
    request
      .post(aggregator('/core/content/creativeShowcaseCategories'))
      .send({ language })
      .end((err, res) => {
        if (err) {
          if (err.status === 503) {
            setTimeout(() => {
              dispatch(fetchCreativeShowcaseCategories(language));
            }, 2000);
          }
        }
        dispatch(receivedCreativeShowcaseCategories(res.body));
      });
    
    // Requesting Categories list
    dispatch(requestingCreativeShowcaseCategories());
  };
}