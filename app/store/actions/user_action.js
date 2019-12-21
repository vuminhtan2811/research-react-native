import {SIGN_UP, SIGN_IN, AUTO_SIGN_IN} from '../types';

import axios from 'axios';
import {
  SIGNUP,
  SIGNIN,
  AUTOSIGNIN,
  FIREBASEURL,
  REFRESH,
} from '../../utils/misc';

export function signUp(data) {
  const request = axios({
    method: 'POST',
    url: SIGNUP,
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true,
    },
    header: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      return response.data;
    })
    .catch(e => {
      return false;
    });

  return {
    type: SIGN_UP,
    payload: request,
  };
}

export function signIn(data) {
  const request = axios({
    method: 'POST',
    url: SIGNIN,
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true,
    },
    header: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      return response.data;
    })
    .catch(e => {
      return false;
    });

  return {
    type: SIGN_IN,
    payload: request,
  };
}

export function autoSignIn(refreshToken) {
  const request = axios({
    method: 'POST',
    url: AUTOSIGNIN,
    data: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(response => {
      return response.data;
    })
    .catch(e => {
      return false;
    });

  return {
    type: AUTO_SIGN_IN,
    payload: request,
  };
}
