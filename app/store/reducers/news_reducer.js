import {GET_NEWS} from '../types';

export default function(state = {}, action) {
  const {payload} = action;

  switch (action.type) {
    case GET_NEWS:
      return {...state, articles: payload};

    default:
      return {...state};
  }
}
