import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import authReducer from "./auth-reducer";
import cardReducer from "./card-reducer";
import adminReducer from "./admin-reducer";
import userReducer from "./user-reducer";
import auctionReducer from "./auction-reducer";

const reducers = combineReducers({
    authReducer,
    cardReducer,
    adminReducer,
    userReducer,
    auctionReducer,
    form: formReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware))
export default store