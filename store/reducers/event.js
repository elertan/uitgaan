import {
    GET_EVENTS_SUCCESS,
    GET_EVENTS_ERROR,
    GET_EVENTS_REQUEST
} from '../actions/event';

const initialState = {
    event: undefined,
    isGettingEvents: false,
    getEventsError: undefined
};

const reducer = (state, action) => {
    switch (action.type) {
        case GET_EVENTS_SUCCESS: {
            return Object.assign({}, state, {
                event: action.event,
                isGettingEvents: false
            });
        }
        case GET_EVENTS_ERROR: {
            return Object.assign({}, state, {
                getEventsError: action.error,
                isGettingEvents: false
            });
        }
        case GET_EVENTS_REQUEST: {
            return Object.assign({}, state, {
                event: undefined,
                isGettingEvents: true
            });
        }
        default: {
            return state || initialState;
        }   
    }
}

export default reducer;