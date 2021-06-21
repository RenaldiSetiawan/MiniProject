import axios from 'axios'

import {
    LITE_INPUT_REQUEST,
    LITE_INPUT_SUCCESS,
    LITE_INPUT_FAIL,

    ORDER_INPUT_REQUEST,
    ORDER_INPUT_SUCCESS,
    ORDER_INPUT_FAIL
} from '../constants/shopConstant'

export const liteInput = (lite) => async (dispatch) => {
    dispatch ({ type: LITE_INPUT_REQUEST, payload: lite });

    try {
        const { data } = await axios.post(`/api/line_items/item/${lite.user_id}`, lite);
        dispatch ({ type: LITE_INPUT_SUCCESS, payload: data })
    } catch (error) {
        dispatch ({
            type: LITE_INPUT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const orderInput = (ord) => async (dispatch) => {
    dispatch({type: ORDER_INPUT_REQUEST, payload:ord})

    try {
        const {data} = await axios.post(`/api/orders/ord/${ord.user_id}`, ord)
        dispatch({type: ORDER_INPUT_SUCCESS, payload:data})
    } catch (error) {
        dispatch({
        type: ORDER_INPUT_FAIL,
        payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
            })
    }
}