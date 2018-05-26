import { combineReducers } from 'redux';
import userReducer from './user';
import eventReducer from './event';

const rootReducer = combineReducers({
    user: userReducer,
    event: eventReducer,
});

export default rootReducer;