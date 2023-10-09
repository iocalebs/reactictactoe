"use client";

import { Button } from "@/components/Button";
import { IconReset } from "@/components/Icon";
import clsx from "clsx";
import { useImmer } from "use-immer";
import { Grid } from "./Grid";
import { TurnIndicator } from "./TurnIndicator";
import { WinLine, WinType } from "./WinLine";
import { Player, Turn, SquarePosition, SquareValues } from "@/types";

type GameStatus = "won" | "draw" | "playing";
type GameState = {
	first: Player;
	squares: Record<SquarePosition, Turn>;
	status: GameStatus;
	whoseTurn: Turn;
	winner?: Player;
	winAnimationComplete: boolean;
	winType?: WinType;
};

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

	function handleChoice(squarePosition: SquarePosition) {
		if (status !== "playing" || squares[squarePosition] !== "") {
			return;
		}
		setGameState((draft) => {
			draft.squares[squarePosition] = whoseTurn;
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
				data-testid="game-grid"
				className="relative flex aspect-square w-full max-w-md items-center justify-center xl:max-w-lg 2xl:max-w-xl"
			>
				{winType && (
					<WinLine
						winType={winType}
						onAnimationEnd={handleWinAnimationComplete}
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

const winStates: Record<WinType, SquarePosition[]> = {
	Top: ["Northwest", "North", "Northeast"],
	CenterHorizontal: ["West", "Center", "East"],
	Bottom: ["Southwest", "South", "Southeast"],

	Left: ["Northwest", "West", "Southwest"],
	CenterVertical: ["North", "Center", "South"],
	Right: ["Northeast", "East", "Southeast"],

	TopLeftBottomRight: ["Northwest", "Center", "Southeast"],
	TopRightBottomLeft: ["Northeast", "Center", "Southwest"],
};

function getGameStatus(
	currentSquares: SquareValues,
	whoseTurn: Player | "",
): [GameStatus, WinType?] {
	const winState = Object.entries(winStates).find(([_, winStateSquares]) => {
		return winStateSquares.every(
			(squarePosition) => currentSquares[squarePosition] == whoseTurn,
		);
	});
	if (winState) {
		return ["won", winState[0] as WinType];
	}
	const allSquaresFilled = Object.values(currentSquares).every(
		(square) => square !== "",
	);
	return [allSquaresFilled ? "draw" : "playing"];
}
