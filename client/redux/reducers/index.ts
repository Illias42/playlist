import { combineReducers } from "redux";
import tracksReducer from './tracks';
import playerReducer from './player';

export const rootReducer = combineReducers({
    playlist: tracksReducer,
    player: playerReducer,
});