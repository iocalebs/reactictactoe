"use client";

import { useImmer } from "use-immer";
import { Button } from "@/components/Button";
import { IconReset } from "@/components/Icon";
import { Turn } from "@/types";
import { Grid } from "./Grid";
import { WinLine, WinState } from "./WinLine";
import clsx from "clsx";

const x = (
	<svg
		viewBox="0 0 100 100"
		width="90%"
		strokeWidth={16}
		className="stroke-black dark:stroke-white"
	>
		<g>
			<line x1="0" y1="0" x2="100" y2="100" />
			<line x1="100" y1="0" x2="0" y2="100" />
		</g>
	</svg>
);

const o = (
	<svg
		viewBox="0 0 100 100"
		strokeWidth={16}
		className="stroke-black dark:stroke-white"
	>
		<circle cx="50" cy="50" r="42" fill="none" />
	</svg>
);

type GameStatus = WinState | "draw" | "playing";

const initialState = {
	first: "x" as Turn,
	status: "playing" as GameStatus,
	squares: Array<Turn>(9).fill(""),
	whoseTurn: "x" as Turn,
	winAnimationComplete: false,
};

export function Game() {
	const [gameState, setGameState] = useImmer({ ...initialState });
	const { first, status, squares, whoseTurn, winAnimationComplete } = gameState;

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
		const newFirst = first === "x" ? "o" : "x";
		setGameState((draft) => {
			draft.first = newFirst;
			draft.whoseTurn = newFirst;
			draft.squares = initialState.squares;
			draft.status = initialState.status;
			draft.winAnimationComplete = false;
		});
	}

	const win = status !== "playing" && status !== "draw";

	return (
		<div className="flex h-full w-full flex-col items-center justify-center">
			<span
				className={clsx(
					"flex items-center gap-1",
					win ? "invisible" : "visible",
				)}
			>
				<div className="inline-block h-4 w-4">
					{whoseTurn !== "" && (whoseTurn === "x" ? x : o)}
				</div>
				{"Turn"}
			</span>
			<div className="relative mb-8 flex w-full max-w-xl items-center justify-center">
				{win && (
					<WinLine
						winState={status}
						onAnimationComplete={handleWinAnimationComplete}
					/>
				)}
				<Grid squares={squares} whoseTurn={whoseTurn} onChoice={handleChoice} />
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
					Play again
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
