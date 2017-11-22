import { UPDATE_SCREEN_SIZE } from '../consts';

export const updateScreenSize = (newState) => ({
  type: UPDATE_SCREEN_SIZE,
  newState
});