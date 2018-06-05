import {
    SET_USER,
    CHECK_FOR_SAVED_USER,
    LOGIN_USER_REQUEST,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    REGISTER_USER_ERROR,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    LOGOUT_USER_REQUEST,
    GET_ALL,
    GET_ALL_ERROR,
    GET_ALL_SUCCESS
} from '../actions/user';
import apiRequest from '../../apiRequest';
import { AsyncStorage } from 'react-native';
import ApiResult from '../../ApiResult';

const creator = (dispatch) => ({
    setUser: async (user) => {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        dispatch({
            type: SET_USER,
            user
        });
    },
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
    },
    register: async (username, password, firstname, lastname, bio, avatar) => {
        dispatch({
            type: REGISTER_USER_REQUEST
        });
        try {
            const response = await apiRequest.post('/auth/register', {
                username,
                password,
                firstname,
                lastname,
                bio,
                avatar,
                dateOfBirth: ''
            });
            ApiResult.fromResponse(response, data => {
                dispatch({
                    type: REGISTER_USER_SUCCESS,
                    user: data
                });
            }, err => {
                dispatch({
                    type: REGISTER_USER_ERROR,
                    err
                });
            });
        } catch (err) {
            console.log(err);
            dispatch({
                type: REGISTER_USER_ERROR,
                err
            });
        }
    },
    getAll: async () => {
        console.log('getAll');
        dispatch({
            type: GET_ALL
        });
        try {
            const response = await apiRequest.get('/user');
            console.log(response.data);
            ApiResult.fromResponse(
                response,
                data => dispatch({ type: GET_ALL_SUCCESS, users: data }),
                err => dispatch({ type: GET_ALL_ERROR, err })
            )
        } catch (err) {
            dispatch({
                type: GET_ALL_ERROR,
                err
            });
        }
    }
});

export default creator;