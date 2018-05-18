import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
} from '../actions/user';
import apiRequest from '../../apiRequest';

const creator = (dispatch) => ({
    login: (username, password) => {
        dispatch({
            type: LOGIN_USER_REQUEST
        });
        console.log(username, password);
        return apiRequest.post('/user', {
            username,
            password
        }).then(res => dispatch({
            type: LOGIN_USER_SUCCESS,
            user: res.data
        })).catch(err => dispatch({
            type: LOGIN_USER_ERROR,
        }));
    },
});

export default creator;