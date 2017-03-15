import { GET_FEEDS } from '../../redux/actions';

export const getFeeds = (feeds = []) => {
  return {
    type: GET_FEEDS,
    feeds
  };
};