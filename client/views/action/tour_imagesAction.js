import axios from 'axios'
import {
     TOURS_IMAGES_REQUEST,
     TOURS_IMAGES_INPUT_SUCCESS,
     TOURS_IMAGES_INPUT_FAIL
} from '../constants/tours_images'

export const createTourImage = (values) => async (dispatch) => {
    dispatch ({type : TOURS_IMAGES_REQUEST})
    const toim = new FormData()
    values.image && toim.append('image', values.image)
    values.toim_primary && toim.append('toim_primary', values.toim_primary)
    values.toim_tour_id && toim.append('toim_tour_id', values.toim_tour_id)
    console.log(toim)
    try {
        const {data} = await axios.post('/api/tours_images/multipart', toim)
        dispatch({type:  TOURS_IMAGES_INPUT_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type:TOURS_IMAGES_INPUT_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message : error.message,
        })
        
    }
}