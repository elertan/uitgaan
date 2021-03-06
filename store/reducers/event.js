import {
  GET_EVENTS_SUCCESS,
  GET_EVENTS_ERROR,
  GET_EVENTS_REQUEST,
  GET_EVENTS_FILTERED_SUCCESS,
  GET_EVENTS_FILTERED_ERROR,
  GET_EVENTS_FILTERED_REQUEST,
  POST_NEW_EVENT_REQUEST,
  POST_NEW_EVENT_SUCCES,
  POST_NEW_EVENT_ERROR,
  GO_TO_SUCCESS,
  GO_TO_ERROR,
  STOP_GO_TO_SUCCESS,
  STOP_GO_TO_ERROR,
} from '../actions/event';

const initialState = {
  events: undefined,
  isGettingEvents: false,
  getEventsError: undefined,
  filteredEvents: undefined,
  isGettingFilteredEvents: false,
  getFilteredEventsError: undefined,
  goToSuccess: undefined,
  goToError: undefined,
  stopGoToSuccess: undefined,
  stopGoToError: undefined,
};

const reducer = (state, action) => {
  switch (action.type) {
    case GET_EVENTS_SUCCESS:
      {
        return Object.assign({}, state, {
          events: action.events,
          isGettingEvents: false
        });
      }
    case GET_EVENTS_ERROR:
      {
        return Object.assign({}, state, {
          getEventsError: action.error,
          isGettingEvents: false
        });
      }
    case GET_EVENTS_REQUEST:
      {
        return Object.assign({}, state, {
          isGettingEvents: true
        });
      }
    case GET_EVENTS_FILTERED_SUCCESS:
      {
        let events = undefined;
        if (action.events.length > 0) {
          events = action.events;
        }
        return Object.assign({}, state, {
          filteredEvents: events,
          isGettingFilteredEvents: false
        });
      }
    case GET_EVENTS_FILTERED_ERROR:
      {
        return Object.assign({}, state, {
          getFilteredEventsError: action.error,
          isGettingFilteredEvents: false
        });
      }
    case GET_EVENTS_FILTERED_REQUEST:
      {
        return Object.assign({}, state, {
          isGettingFilteredEvents: true
        });
      }
    case POST_NEW_EVENT_REQUEST:
      {
        return Object.assign({}, state, {
          postedEvent: false
        });
      }
    case POST_NEW_EVENT_SUCCES:
      {
        return Object.assign({}, state, {
          postedEvents: true
        });
      }
    case POST_NEW_EVENT_ERROR:
      {
        return Object.assign({}, state, {
          postEventsError: action.error,
        });
      }
    case GO_TO_SUCCESS:
      {
        return Object.assign({}, state, {
          goToSuccess: action.eventId
        });
      }
    case GO_TO_ERROR:
      {
        return Object.assign({}, state, {
          goToError: action.err
        });
      }
    case STOP_GO_TO_SUCCESS:
      {
        return Object.assign({}, state, {
          stopGoToSuccess: action.eventId
        });
      }
    case STOP_GO_TO_ERROR:
      {
        return Object.assign({}, state, {
          stopGoToError: action.err
        });
      }
    default:
      {
        return state || initialState;
      }
  }
}

export default reducer;