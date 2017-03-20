import { combineReducers } from 'redux';

// Reducers
import { loaderReducer } from '../modules/shared/loader/reducer';
import { messageReducer } from '../modules/shared/message/reducer';
import {
    feedsReducer,
    feedReducer
} from '../modules/feeds/reducer';

// Combine Reducers
const reducers = combineReducers({
    loaderReducer,
    feedsReducer,
    feedReducer,
    messageReducer
});

export default reducers;