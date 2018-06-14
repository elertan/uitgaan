import {
    GET_EVENTS_ERROR,
    GET_EVENTS_REQUEST,
    GET_EVENTS_SUCCESS,
    GET_EVENTS_FILTERED_ERROR,
    GET_EVENTS_FILTERED_REQUEST,
    GET_EVENTS_FILTERED_SUCCESS,
    POST_NEW_EVENT_REQUEST,
    POST_NEW_EVENT_SUCCES,
    POST_NEW_EVENT_ERROR,
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
    },
    newEvent: async (name, description, till, from, price, image) => {
        dispatch({
            type: POST_NEW_EVENT_REQUEST
        });
        try {
            const response = await apiRequest.post('/events/add', {
                name,
                description,
                till,
                from,
                price,
                image
            });
            ApiResult.fromResponse(response, data => {
                dispatch({
                    type: POST_NEW_EVENT_SUCCES,
                    //events
                });
            }, err => {
                dispatch({
                    type: POST_NEW_EVENT_ERROR,
                    err
                });
            });
        } catch (err) {
            console.log(err);
            dispatch({
                type: POST_NEW_EVENT_ERROR,
                err
            });
        }
    },
});

export default creator;