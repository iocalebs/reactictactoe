import { combineReducers } from "@reduxjs/toolkit";
import { gameSlice } from "./slices/gameSlice";

export const rootReducer = combineReducers({
	game: gameSlice.reducer,
});
