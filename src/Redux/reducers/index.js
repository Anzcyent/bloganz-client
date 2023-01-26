import { combineReducers } from 'redux';
import appReducer from './app';
import articlesReducer from './articles';
import authReducer from "./auth";

const rootReducer = combineReducers({
    appReducer,
    articlesReducer,
    authReducer
})

export default rootReducer;