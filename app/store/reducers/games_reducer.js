import {GET_GAMES} from '../types';

export default function(state = {}, action) {
  const {payload} = action;

  switch (action.type) {
    case GET_GAMES:
      return {...state, games: payload};

    default:
      return {...state};
  }
}
