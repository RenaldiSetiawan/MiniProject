import axios from 'axios'

import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL
} from '../constants/usersConstants'

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