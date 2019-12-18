import {SIGN_UP, SIGN_IN} from '../types';

export default function(state = {}, action) {
  const {payload} = action;

  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        auth: {
          uid: payload.localId || false,
          token: payload.idToken || false,
          refToken: payload.refreshToken || false,
        },
      };
    case SIGN_UP:
      return {
        ...state,
        auth: {
          uid: payload.localId || false,
          token: payload.idToken || false,
          refToken: payload.refreshToken || false,
        },
      };

    default:
      return state;
  }
}
