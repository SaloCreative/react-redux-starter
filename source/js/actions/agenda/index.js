// Must keep this relative
import api from '../../store/aggregator';

import {
  REQUESTING_AGENDA,
  RECEIVE_AGENDA
} from '../consts';

export const requestingAgenda = () => ({
  type: REQUESTING_AGENDA
});

export const receiveAgenda = (agenda) => ({
  type: RECEIVE_AGENDA,
  data: agenda,
  last_updated: Date.now()
});

export function updateAgenda(user, agenda) {
  return (dispatch) => {
    dispatch(requestingAgenda());

    const data = {
      id: user.id,
      agenda
    };

    api('/agenda/update', data).then(value => {
      dispatch(receiveAgenda(value));
    }).catch(reason => {
      if (reason.status === 503) {
        setTimeout(() => {
          dispatch(updateAgenda(user, agenda));
        }, 2000);
      }
    });
  };
}

export function fetchAgenda(id) {
  return (dispatch) => {
    dispatch(requestingAgenda());

    const data = {
      id
    };

    api('/agenda/get', data).then(value => {
      dispatch(receiveAgenda(value));
    }).catch(reason => {
      if (reason.status === 503) {
        setTimeout(() => {
          dispatch(fetchAgenda(id));
        }, 2000);
      }
    });
  };
}