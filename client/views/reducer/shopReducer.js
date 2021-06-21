import {
    LITE_INPUT_REQUEST,
    LITE_INPUT_SUCCESS,
    LITE_INPUT_FAIL,

    ORDER_INPUT_REQUEST,
    ORDER_INPUT_SUCCESS,
    ORDER_INPUT_FAIL
} from '../constants/shopConstant'

export const liteCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case LITE_INPUT_REQUEST:
            return { loading: true };
        case LITE_INPUT_SUCCESS:
            return { loading: false, liteRegis: action.payload }
        case LITE_INPUT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const orderCreateReducer = (state = {}, action) =>{
    switch(action.type){
      case ORDER_INPUT_REQUEST:
        return {loading: true};
      case ORDER_INPUT_SUCCESS:
        return {loading: false, orderRegis: action.payload}
      case ORDER_INPUT_FAIL:
        return {loading: false, error: action.payload}
      default:
        return state
    }
  }
  