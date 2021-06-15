import {
     TOURS_IMAGES_REQUEST,
     TOURS_IMAGES_INPUT_SUCCESS,
     TOURS_IMAGES_INPUT_FAIL
} from '../constants/tours_images'

export const toimCreate = (state={}, action) => {
    switch (action.type) {
        case TOURS_IMAGES_REQUEST:
            return {loading: true, toim:{}};
        case TOURS_IMAGES_INPUT_SUCCESS:
            return {loading: false, toimRegis: action.payload.toim};
        case TOURS_IMAGES_INPUT_FAIL:
            return {loading: false, error: action.payload.toim};
        default:
            return state
    }
}