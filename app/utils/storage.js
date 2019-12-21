import {AsyncStorage} from 'react-native';

export const setTokens = (values, cb) => {
  const expiration = new Date().getTime() + 3600 * 1000;
  return AsyncStorage.multiSet([
    ['@nba_app@token', values.token],
    ['@nba_app@refreshToken', values.refToken],
    ['@nba_app@expireToken', expiration.toString()],
    ['@nba_app@uid', values.uid],
  ]).then(response => {
    cb();
  });
};

export const getTokens = cb => {
  return AsyncStorage.multiGet([
    '@nba_app@token',
    '@nba_app@refreshToken',
    '@nba_app@expireToken',
    '@nba_app@uid',
  ]).then(value => {
    cb(value);
  });
};
