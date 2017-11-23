import {
  TEST_PHOTOS_FETCH,
  TEST_PHOTOS_SUCCESS,
  TEST_PHOTOS_FAILED
} from '../../actions/photos/types';

const initialState = {
  data: [],
  fetching: false,
  error: false,
  last_updated: ''
};

function photos(state = initialState, action) {
  switch (action.type) {
    case TEST_PHOTOS_FETCH:
      return {
        ...state,
        fetching: true,
        error: false,
        last_updated: ''
      };

    case TEST_PHOTOS_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: false,
        data: action.payload,
        last_updated: action.meta.last_updated
      };
      
    case TEST_PHOTOS_FAILED:
      return {
        ...state,
        fetching: false,
        error: true,
        last_updated: ''
      };

    default:
      return state;
  }
}

export default photos;