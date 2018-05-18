import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS
} from '../actions/user';

const initialState = {
    user: undefined,
    isLoggingIn: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case LOGIN_USER_REQUEST: {
            return Object.assign({}, state, {
                isLoggingIn: true,
            });
        }
        case LOGIN_USER_SUCCESS: {
            return Object.assign({}, state, {
                user: action.user,
                isLoggingIn: false,
            });
        }
        case LOGIN_USER_ERROR: {
            return Object.assign({}, state, {
                isLoggingIn: false,
            });
        }
        default: {
            return state || initialState;
        }   
    }
}

export default reducer;