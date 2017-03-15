import { combineReducers } from 'redux';

// Reducers
import loaderReducer from '../modules/shared/loader/reducer';
import feedsReducer from '../modules/feeds/reducer';

// Combine Reducers
const reducers = combineReducers({
    loaderReducer,
    feedsReducer
});

export default reducers;
