import {
    GET_EVENTS_ERROR,
    GET_EVENTS_REQUEST,
    GET_EVENTS_SUCCESS
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
    }
});

export default creator;