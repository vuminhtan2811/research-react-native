import axios from 'axios';
import {FIREBASEURL, convertFirebase, findTeamData} from '../../utils/misc';
import {GET_GAMES} from '../types';

export function getGames() {
  const promise = new Promise((resolve, reject) => {
    const request = axios({
      url: `${FIREBASEURL}/teams.json`,
      method: 'GET',
    })
      .then(response => {
        const teams = convertFirebase(response.data);
        axios({
          url: `${FIREBASEURL}/games.json`,
          method: 'GET',
        }).then(response => {
          const games = convertFirebase(response.data);
          let responseData = [];
          for (let key in games) {
            responseData.push({
              ...games[key],
              awayData: findTeamData(games[key].away, teams),
              localData: findTeamData(games[key].local, teams),
            });
          }
          resolve(responseData);
        });
      })
      .catch(e => reject(false));
  });
  return {
    type: GET_GAMES,
    payload: promise,
  };
}
