import request from 'superagent';
import { aggregator } from '../../api/environment';

import {
  REQUESTING_CHANNELS_LIST,
  RECEIVE_CHANNELS_LIST
} from '../consts';

export const requestingChannelList = () => ({
  type: REQUESTING_CHANNELS_LIST
});

export const receiveChannelList = (json) => ({
  type: RECEIVE_CHANNELS_LIST,
  data: json,
  last_updated: Date.now()
});

export function fetchChannelList(language = 'en') {
  return (dispatch) => {
    request
      .post(aggregator('/core/content/channels'))
      .send({ language })
      .end((err, res) => {
        if (err) {
          if (err.status === 503) {
            setTimeout(() => {
              dispatch(fetchChannelList(language));
            }, 2000);
          }
        }
        dispatch(receiveChannelList(res.body));
      });
  };
}