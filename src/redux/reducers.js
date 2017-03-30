import { combineReducers } from 'redux';

// Reducers
import {
    langReducer,
    loaderReducer,
    messageReducer
}
from '../modules/shared/index';
import {
    feedsReducer,
    feedReducer
}
from '../modules/feeds/reducer';

// Combine Reducers
const reducers = combineReducers({
    langReducer,
    loaderReducer,
    feedsReducer,
    feedReducer,
    messageReducer
});

export default reducers;