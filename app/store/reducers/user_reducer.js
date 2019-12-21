import {SIGN_UP, SIGN_IN, AUTO_SIGN_IN} from '../types';

export default function(state = {}, action) {
  const {payload} = action;

  switch (action.type) {
    case SIGN_IN:
      /*SIGN IN */
      return {
        ...state,
        auth: userToken(payload),
      };
    /*SIGN UP */
    case SIGN_UP:
      return {
        ...state,
        auth: userToken(payload),
      };
    /*AUTO SIGN*/
    case AUTO_SIGN_IN:
      return {
        ...state,
        auth: {
          uid: payload.user_id || false,
          token: payload.id_token || false,
          refToken: payload.refresh_token || false,
        },
      };

    default:
      return state;
  }
}

const userToken = payload => {
  return {
    uid: payload.localId || false,
    token: payload.idToken || false,
    refToken: payload.refreshToken || false,
  };
};
