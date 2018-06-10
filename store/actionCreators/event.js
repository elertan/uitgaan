import {
    GET_EVENTS_ERROR,
    GET_EVENTS_REQUEST,
    GET_EVENTS_SUCCESS,
    GET_EVENTS_FILTERED_ERROR,
    GET_EVENTS_FILTERED_REQUEST,
    GET_EVENTS_FILTERED_SUCCESS
} from '../actions/event';
import apiRequest from '../../apiRequest';
import { AsyncStorage } from 'react-native';
import ApiResult from '../../ApiResult';

const creator = (dispatch) => ({
    getEvents: async () => {
        dispatch({
            type: GET_EVENTS_REQUEST
        });
        const promise = apiRequest.get('/events/all');
        const response = await promise;
        ApiResult.fromResponse(response, async data => {
            const events = data;
            dispatch({
                type: GET_EVENTS_SUCCESS,
                events
            });
        }, err => {
            dispatch({
                type: GET_EVENTS_ERROR,
                error: err
            });
        });
    },
    getEventsFiltered: async (name) => {
        dispatch({
            type: GET_EVENTS_FILTERED_REQUEST
        });
        const promise = apiRequest.post('/events/filter', {
            name
        });
        const response = await promise;
        ApiResult.fromResponse(response, async data => {
            const events = data;
            dispatch({
                type: GET_EVENTS_FILTERED_SUCCESS,
                events
            });
        }, err => {
            dispatch({
                type: GET_EVENTS_FILTERED_ERROR,
                error: err
            });
        });
    }
});

export default creator;