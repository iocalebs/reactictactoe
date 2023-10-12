import { combineReducers } from "@reduxjs/toolkit";
import { gameSlice } from "./slices";

export const rootReducer = combineReducers({
	game: gameSlice.reducer,
});
