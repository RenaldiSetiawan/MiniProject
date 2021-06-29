import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    
    USER_FINDONE_REQUEST,
    USER_FINDONE_SUCCESS,
    USER_FINDONE_FAIL
} from '../constants/usersConstants'

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, userRegis: action.payload }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

//login
export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: true, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const userListOneReducer = (state = {}, action) => {
    switch(action.type){
        case USER_FINDONE_REQUEST:
            return {loading:true}
        case USER_FINDONE_SUCCESS: 
            return {loading:true, user:action.payload}
        case USER_FINDONE_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}