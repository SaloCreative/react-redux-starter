import request from 'superagent';
import { aggregator } from '../../api/environment';

import {
  REQUESTING_TAGS,
  RECEIVED_TAGS
} from '../consts';

export const requestingTags = () => ({
  type: REQUESTING_TAGS
});

export const receiveTags = (json) => ({
  type: RECEIVED_TAGS,
  data: json,
  last_updated: Date.now()
});

export function fetchTags(language = 'en') {
  return (dispatch) => {
    request
    .post(aggregator('/core/tags'))
    .send({ language })
    .end((err, res) => {
      if (err) {
        if (err.status === 503) {
          setTimeout(() => {
            dispatch(fetchTags(language));
          }, 2000);
        }
      }
      dispatch(receiveTags((res.body)));
    });
  };
}