import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk" ;
import { toimCreate } from './reducer/tours_imagesReducer'
import { userRegisterReducer } from './reducer/usersReducer'

const initialState = {

}

const reducer = combineReducers({
    toimCreate: toimCreate,
    userRegisterReducer: userRegisterReducer
})

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;