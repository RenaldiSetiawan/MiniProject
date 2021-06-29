import axios from 'axios'

import {
    TOUR_SEARCH_REQUEST,
    TOUR_SEARCH_SUCCESS,
    TOUR_SEARCH_FAIL
} from '../constants/toursConstant'

export const searchTour = (tour_name) => async (dispatch) => {
    dispatch ({type : TOUR_SEARCH_REQUEST});
   
    try {
      const {data} = await axios.get(`/api/tours/search/tour?tour_name=${tour_name}`);
      
      dispatch({ 
        type : TOUR_SEARCH_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch ({
        type: TOUR_SEARCH_FAIL,
        payload:
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }