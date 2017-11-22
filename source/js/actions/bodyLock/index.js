import {
  LOCK_BODY,
  UNLOCK_BODY
} from '../consts';

export const unlockBody = () => ({
  type: UNLOCK_BODY
});

export const lockBody = () => ({
  type: LOCK_BODY
});