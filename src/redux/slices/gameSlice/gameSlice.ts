import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getGameStatus } from "./reducerUtils";
import { type GameState, SquarePosition } from "./gameTypes";

const initialState: GameState = {
	first: "x",
	squares: {
		Northwest: "",
		North: "",
		Northeast: "",
		West: "",
		Center: "",
		East: "",
		Southwest: "",
		South: "",
		Southeast: "",
	},
	status: "playing",
	whoseTurn: "x",
	winner: undefined,
	winAnimationComplete: false,
	winType: undefined,
};

export const gameSlice = createSlice({
	name: "game",
	initialState,
	reducers: {
		move: (state, action: PayloadAction<SquarePosition>) => {
			const { whoseTurn } = state;
			const squarePOsition = action.payload;
			if (state.status !== "playing" || state.squares[squarePOsition] !== "") {
				return;
			}
			state.squares[squarePOsition] = whoseTurn;
			[state.status, state.winType] = getGameStatus(state.squares, whoseTurn);
			if (state.status == "won" && whoseTurn !== "") {
				state.winner = whoseTurn;
			}
			state.whoseTurn =
				state.status !== "playing" ? "" : whoseTurn === "x" ? "o" : "x";
		},
		reset: (state) => {
			const newFirst = state.first === "x" ? "o" : "x";
			return {
				...initialState,
				first: newFirst,
				whoseTurn: newFirst,
			};
		},
	},
});

export const { move, reset } = gameSlice.actions;
