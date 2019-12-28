import axios from 'axios';
import {FIREBASEURL, convertFirebase} from '../../utils/misc';
import {GET_NEWS} from '../types';

export function getNews() {
  const request = axios({
    method: 'GET',
    url: `${FIREBASEURL}/news.json`,
  })
    .then(response => {
      let articles = convertFirebase(response.data);
      return articles;
    })
    .catch(e => {
      return false;
    });

  return {
    type: GET_NEWS,
    payload: request,
  };
}
