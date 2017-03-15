import { GET_FEEDS } from '../../redux/actions';

const feedsReducer = function(state = [], action) {

  switch(action.type) {

    case GET_FEEDS:
      return action.feeds;

  }

  return state;

}

export default feedsReducer;