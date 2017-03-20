import {
  GET_FEEDS,
  FEED_DETAIL
} from '../../redux/actions';

export const getFeeds = (feeds = []) => {
  return {
    type: GET_FEEDS,
    feeds
  };
};

export const getFeed = (feed = {}) => {
  return {
    type: FEED_DETAIL,
    feed
  };
};