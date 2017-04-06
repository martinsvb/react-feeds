import { combineReducers } from 'redux';

// Reducers
import {
    loaderReducer,
    messageReducer,
    transReducer
}
from '../modules/shared/index';
import { userReducer } from '../modules/user/index';
import {
    feedsReducer,
    feedReducer
}
from '../modules/feeds/reducer';

// Combine Reducers
const reducers = combineReducers({
    loaderReducer,
    feedsReducer,
    feedReducer,
    messageReducer,
    transReducer,
    userReducer
});

export default reducers;