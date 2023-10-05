"use client";

import { Button } from "@/components/Button";
import { IconReset } from "@/components/Icon";
import { usePrefersReducedMotion } from "@/hooks";
import { Turn } from "@/types";
import clsx from "clsx";
import { useImmer } from "use-immer";
import { Grid } from "./Grid";
import { TurnIndicator } from "./TurnIndicator";
import { WinLine, WinState } from "./WinLine";

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
	const prefersReducedMotion = usePrefersReducedMotion();

	function handleChoice(square: number) {
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
			<TurnIndicator whoseTurn={whoseTurn} />
			<div className="relative mb-8 flex w-full max-w-xl items-center justify-center">
				{win && (
					<WinLine
						reduceMotion={prefersReducedMotion}
						winState={status}
						onAnimationComplete={handleWinAnimationComplete}
					/>
				)}
				<Grid squares={squares} whoseTurn={whoseTurn} onChoice={handleChoice} />
			</div>
			<div
				className={clsx(
					"flex basis-1/5 items-center sm:mt-0 sm:basis-auto",
					winAnimationComplete || status === "draw"
						? "animate-fade-in visible"
						: "invisible",
				)}
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
	CenterHorizontal: [3, 4, 5],
	Bottom: [6, 7, 8],

	Left: [0, 3, 6],
	CenterVertical: [1, 4, 7],
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
