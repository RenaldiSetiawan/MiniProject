import axios from 'axios'

import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
} from '../constants/usersConstants'

// register
export const register = (user) => async (dispatch) => {
    dispatch ({ type: USER_REGISTER_REQUEST, payload: user });

    try {
        const { data } = await axios.post("/api/users/register", user);
        dispatch ({ type: USER_REGISTER_SUCCESS, payload: data })
    } catch (error) {
        dispatch ({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}


// Login
export const login = (email, password) => async (dispatch) => {
    dispatch ({ type: USER_LOGIN_REQUEST, payload: {email, password} });
    const user = {
        user_email: email,
        user_password: password,
    };

    try {
        const { data } = await axios.post("/api/users/signin", user);
        dispatch ({ type: USER_LOGIN_SUCCESS, payload: data })
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch ({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}