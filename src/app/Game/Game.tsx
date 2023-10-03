"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useImmer } from "use-immer";
import { Button } from "@/components/Button";
import { IconReset } from "@/components/Icon";
import { Turn } from "@/types";
import { Grid } from "./Grid";
import { WinLine, WinState } from "./WinLine";

type GameStatus = WinState | "draw" | "playing";

const initialState = {
	status: "playing" as GameStatus,
	squares: Array<Turn>(9).fill(""),
	whoseTurn: "x" as Turn,
	winAnimationComplete: false,
};

export function Game() {
	const [gameState, setGameState] = useImmer({ ...initialState });
	const { status, squares, whoseTurn, winAnimationComplete } = gameState;

	function handleChoice(square: number) {
		if (status !== "playing" || squares[square] !== "") {
			return;
		}
		setGameState((draft) => {
			draft.squares[square] = whoseTurn;
			draft.status = getGameStatus(draft.squares, whoseTurn);
			draft.whoseTurn =
				draft.status !== "playing" ? "" : whoseTurn === "x" ? "o" : "x";
		});
	}

	function handleWinAnimationComplete() {
		setGameState((draft) => {
			draft.winAnimationComplete = true;
		});
	}

	function reset() {
		setGameState({ ...initialState });
	}

	const win = status !== "playing" && status !== "draw";

	return (
		<div className="flex h-full w-full flex-col items-center justify-center">
			<div className="relative mb-4">
				{win && (
					<WinLine
						winState={status}
						onAnimationComplete={handleWinAnimationComplete}
					/>
				)}
				<div className="m-8">
					<Grid
						squares={squares}
						whoseTurn={whoseTurn}
						onChoice={handleChoice}
					/>
				</div>
			</div>
			<div
				className={
					"mt-16 transition-opacity duration-500 sm:mt-0" +
					(winAnimationComplete || status === "draw"
						? " animate-pulse opacity-100  "
						: " opacity-0")
				}
				style={{ animationDelay: "1s", animationDuration: "3s" }}
			>
				<Button
					icon={<IconReset className="h-8 w-8 sm:h-5 sm:w-5" />}
					onClick={reset}
				>
					Reset
				</Button>
			</div>
		</div>
	);
}

const winStates: Record<WinState, number[]> = {
	Top: [0, 1, 2],
	MiddleHorizontal: [3, 4, 5],
	Bottom: [6, 7, 8],

	Left: [0, 3, 6],
	MiddleVertical: [1, 4, 7],
	Right: [2, 5, 8],

	// diagonal lines
	TopLeftBottomRight: [0, 4, 8],
	TopRightBottomLeft: [2, 4, 6],
};

function getGameStatus(currentSquares: Turn[], whoseTurn: Turn): GameStatus {
	const winState = Object.entries(winStates).find(([_, winStateSquares]) => {
		return winStateSquares.every((i) => currentSquares[i] == whoseTurn);
	});
	if (winState) {
		return winState[0] as WinState;
	}
	const allSquaresFilled = currentSquares.every((square) => square !== "");
	return allSquaresFilled ? "draw" : "playing";
}
