import {
  RESET_MAP_FILTERS,
  SET_MAP_FILTERS
} from '../consts';

export const setMapFilters = (newState) => ({
  type: SET_MAP_FILTERS,
  newState
});

export const resetMapFilters = () => ({
  type: RESET_MAP_FILTERS
});