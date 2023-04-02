import { combineReducers } from 'redux';
import {mainReducer} from "./main/reducer";
import {postReducer} from "./post/reducer";


export const rootReducer = combineReducers({
    main: mainReducer,
    post: postReducer
})
