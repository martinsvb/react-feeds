import { GET_FEEDS, FEED_DETAIL, ADD_COMMENT } from '../../redux/actions';

export const feedsReducer = function(state = [], action) {

  switch(action.type) {

    case GET_FEEDS:
      return action.feeds;

  }

  return state;
};

let initFeedState = {
  text: null,
  person: {
    avatar: null,
    firstName: null,
    lastName: null
  },
  comments: []
};

export const feedReducer = function(state = initFeedState, action) {

  switch(action.type) {

    case FEED_DETAIL:
      return action.feed;

  }

  return state;
};
