import {
    GET_EVENTS_SUCCESS,
    GET_EVENTS_ERROR,
    GET_EVENTS_REQUEST,
    GET_EVENTS_FILTERED_SUCCESS,
    GET_EVENTS_FILTERED_ERROR,
    GET_EVENTS_FILTERED_REQUEST
} from '../actions/event';

const initialState = {
    events: undefined,
    isGettingEvents: false,
    getEventsError: undefined,
    filteredEvents: undefined,
    isGettingFilteredEvents: false,
    getFilteredEventsError: undefined
};

const reducer = (state, action) => {
    switch (action.type) {
        case GET_EVENTS_SUCCESS: {
            return Object.assign({}, state, {
                events: action.events,
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
                isGettingEvents: true
            });
        }
        case GET_EVENTS_FILTERED_SUCCESS: {
            return Object.assign({}, state, {
                filteredEvents: action.events,
                isGettingFilteredEvents: false
            });
        }
        case GET_EVENTS_FILTERED_ERROR: {
            return Object.assign({}, state, {
                getFilteredEventsError: action.error,
                isGettingFilteredEvents: false
            });
        }
        case GET_EVENTS_FILTERED_REQUEST: {
            return Object.assign({}, state, {
                isGettingFilteredEvents: true
            });
        }
        default: {
            return state || initialState;
        }   
    }
}

export default reducer;