import {
    TOUR_SEARCH_REQUEST,
    TOUR_SEARCH_SUCCESS,
    TOUR_SEARCH_FAIL
} from '../constants/toursConstant'

export const toursSearch = (state={}, action) => {
   switch (action.type) {

    case TOUR_SEARCH_REQUEST:
        return { loading: true };
      case TOUR_SEARCH_SUCCESS:
        return { loading: false, searching: action.payload };
      case TOUR_SEARCH_FAIL:
        return { loading: false, error: action.payload };

       default:
           return state
   }
}