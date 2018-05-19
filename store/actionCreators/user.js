import {
    CHECK_FOR_SAVED_USER,
    LOGIN_USER_REQUEST,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_REQUEST
} from '../actions/user';
import apiRequest from '../../apiRequest';
import { AsyncStorage } from 'react-native';
import ApiResult from '../../ApiResult';

const creator = (dispatch) => ({
    checkForSavedUser: () => {
        return AsyncStorage.getItem('user').then(data => {
            dispatch({
                type: CHECK_FOR_SAVED_USER,
                user: JSON.parse(data)
            });
        }).catch(err => console.error(err));
    },
    login: async (username, password) => {
        dispatch({
            type: LOGIN_USER_REQUEST
        });
        const promise = apiRequest.post('/auth/login', {
            username,
            password
        });
        const response = await promise;
        ApiResult.fromResponse(response, async data => {
            const user = data;
            await AsyncStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: LOGIN_USER_SUCCESS,
                user
            });
        }, err => {
            dispatch({
                type: LOGIN_USER_ERROR,
                error: err
            });
        });
    },
    logout: async () => {
        await AsyncStorage.removeItem('user');
        dispatch({
            type: LOGOUT_USER_REQUEST
        });
    }
});

export default creator;