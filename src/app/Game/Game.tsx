"use client";

import { Button } from "@/components/Button";
import { IconReset } from "@/components/Icon";
import { usePrefersReducedMotion } from "@/hooks";
import { Player, Turn } from "@/types";
import clsx from "clsx";
import { useImmer } from "use-immer";
import { Grid } from "./Grid";
import { TurnIndicator } from "./TurnIndicator";
import { WinLine, WinType } from "./WinLine";

type GameStatus = "won" | "draw" | "playing";
type GameState = {
	first: Player;
	squares: Turn[];
	status: GameStatus;
	whoseTurn: Turn;
	winner?: Player;
	winAnimationComplete: boolean;
	winType?: WinType;
};

const initialState: GameState = {
	first: "x",
	squares: Array(9).fill(""),
	status: "playing",
	whoseTurn: "x",
	winner: undefined,
	winAnimationComplete: false,
	winType: undefined,
};

export function Game() {
	const [gameState, setGameState] = useImmer({ ...initialState });
	const {
		first,
		status,
		squares,
		whoseTurn,
		winner,
		winType,
		winAnimationComplete,
	} = gameState;
	const prefersReducedMotion = usePrefersReducedMotion();

	function handleChoice(square: number) {
		if (status !== "playing" || squares[square] !== "") {
			return;
		}
		setGameState((draft) => {
			draft.squares[square] = whoseTurn;
			[draft.status, draft.winType] = getGameStatus(draft.squares, whoseTurn);
			draft.whoseTurn =
				draft.status !== "playing" ? "" : whoseTurn === "x" ? "o" : "x";
			if (draft.status == "won" && whoseTurn !== "") {
				draft.winner = whoseTurn;
			}
		});
	}

	function handleWinAnimationComplete() {
		setGameState((draft) => {
			draft.winAnimationComplete = true;
		});
	}

	function reset() {
		const newFirst = first === "x" ? "o" : "x";
		console.log(newFirst);
		setGameState({
			...initialState,
			first: newFirst,
			whoseTurn: newFirst,
		});
	}

	const gameOverMessage =
		(winner && `${winner} wins!`) ||
		(status === "draw" && "The game has ended in a draw.");

	return (
		<div className="flex h-full w-full flex-col items-center justify-center">
			<TurnIndicator whoseTurn={whoseTurn} />
			<div
				data-testid="grid"
				className="relative flex aspect-square w-full max-w-xl items-center justify-center"
			>
				{winType && (
					<WinLine
						reduceMotion={prefersReducedMotion}
						winType={winType}
						onAnimationComplete={handleWinAnimationComplete}
					/>
				)}
				<Grid squares={squares} whoseTurn={whoseTurn} onChoice={handleChoice} />
			</div>
			<div
				className={clsx(
					"mt-8 flex basis-1/5 items-center sm:basis-auto",
					winAnimationComplete || status === "draw"
						? "visible animate-fade-in"
						: "invisible",
				)}
			>
				{gameOverMessage && (
					<span className="sr-only" aria-live="assertive" role="alert">
						{gameOverMessage}
					</span>
				)}
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

const winStates: Record<WinType, number[]> = {
	Top: [0, 1, 2],
	CenterHorizontal: [3, 4, 5],
	Bottom: [6, 7, 8],

	Left: [0, 3, 6],
	CenterVertical: [1, 4, 7],
	Right: [2, 5, 8],

	TopLeftBottomRight: [0, 4, 8],
	TopRightBottomLeft: [2, 4, 6],
};

function getGameStatus(
	currentSquares: Array<Player | "">,
	whoseTurn: Player | "",
): [GameStatus, WinType?] {
	const winState = Object.entries(winStates).find(([_, winStateSquares]) => {
		return winStateSquares.every((i) => currentSquares[i] == whoseTurn);
	});
	if (winState) {
		return ["won", winState[0] as WinType];
	}
	const allSquaresFilled = currentSquares.every((square) => square !== "");
	return [allSquaresFilled ? "draw" : "playing"];
}
