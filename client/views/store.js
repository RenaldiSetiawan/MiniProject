import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk" ;
import { toimCreate } from './reducer/tours_imagesReducer'
import { userRegisterReducer, userLoginReducer } from './reducer/usersReducer'
import { liteCreateReducer, orderCreateReducer } from './reducer/shopReducer'


const initialState = {
    userLogin: {
        userInfo: 
        typeof window !== "undefined"
        ? localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        :null
        : null,
    }
}

const reducer = combineReducers({
    toimCreate: toimCreate,
    userRegisterReducer: userRegisterReducer,
    userLogin: userLoginReducer,
    liteShop: liteCreateReducer,
    orderCreate:orderCreateReducer,

})

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;