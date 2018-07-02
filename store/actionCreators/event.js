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
    GO_TO_SUCCESS,
    GO_TO_ERROR,
} from '../actions/event';
import ApiRequest from '../../apiRequest';
import { AsyncStorage } from 'react-native';
import ApiResult from '../../ApiResult';

const creator = (dispatch) => ({
    getEvents: async () => {
        dispatch({
            type: GET_EVENTS_REQUEST
        });
        const promise = ApiRequest.getInstance().axios.get('/events/all');
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
        const promise = ApiRequest.getInstance().axios.post('/events/filter', {
            name
        });
        const response = await promise;
        ApiResult.fromResponse(response, async data => {
            dispatch({
                type: GET_EVENTS_FILTERED_SUCCESS,
                events: data
            });
        }, err => {
            dispatch({
                type: GET_EVENTS_FILTERED_ERROR,
                error: err
            });
        });
    },
    newEvent: async (name, description, till, from, price, image, privateEvent) => {
        dispatch({
            type: POST_NEW_EVENT_REQUEST
        });
        try {
            const response = await ApiRequest.getInstance().axios.post('/events/add', {
                name,
                description,
                till,
                from,
                price,
                image,
                privateEvent,

            });
            ApiResult.fromResponse(response, data => {
                dispatch({
                    type: POST_NEW_EVENT_SUCCES,
                    //events
                });
            }, err => {
                dispatch({
                    type: POST_NEW_EVENT_ERROR,
                    error: err
                });
            });
        } catch (err) {
            console.log(err);
            dispatch({
                type: POST_NEW_EVENT_ERROR,
                error:err
            });
        }
    },
    goTo: async (eventId) => {
        const response = await ApiRequest.getInstance().axios.post('/events/go-to', {eventId});
        ApiResult.fromResponse(
            response,
            data => dispatch({
                type: GO_TO_SUCCESS,
                eventId: data
            }),
            err => dispatch({
                type: GO_TO_ERROR,
                err
            }),
        );
    }
});

export default creator;