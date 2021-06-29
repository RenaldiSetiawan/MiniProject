import axios from 'axios'

import {
    LITE_INPUT_REQUEST,
    LITE_INPUT_SUCCESS,
    LITE_INPUT_FAIL,

    KOMEN_INPUT_REQUEST,
    KOMEN_INPUT_SUCCESS,
    KOMEN_INPUT_FAIL,

    ORDER_INPUT_REQUEST,
    ORDER_INPUT_SUCCESS,
    ORDER_INPUT_FAIL,

    ORDER_UPDATE_REQUEST,
    ORDER_UPDATE_SUCCESS,
    ORDER_UPDATE_FAIL
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

export const komenInput = (toco) => async (dispatch) => {
    dispatch ({ type: KOMEN_INPUT_REQUEST, payload: toco });

    try {
        const { data } = await axios.post(`/api/tours_comments`, toco);
        dispatch ({ type: KOMEN_INPUT_SUCCESS, payload: data })
    } catch (error) {
        dispatch ({
            type: KOMEN_INPUT_FAIL,
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

// export const orderUpdate = (upd) => async (dispatch) => {
//     dispatch({type: ORDER_UPDATE_REQUEST, payload:upd})

//     try {
//         const {data} = await axios.put(`/api/shop/ordered/${upd.user_id}`, upd)
//         dispatch({type: ORDER_UPDATE_SUCCESS, payload:data})
//     } catch (error) {
//         dispatch({
//         type: ORDER_UPDATE_FAIL,
//         payload:
//               error.response && error.response.data.message
//                 ? error.response.data.message
//                 : error.message,
//             })
//     }
// }