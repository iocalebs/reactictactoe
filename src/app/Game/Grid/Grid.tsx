"use client";

import { Turn } from "@/types";
import { Square } from "./Square";
import { useImmer } from "use-immer";

export function Grid() {
	const [gameState, setGameState] = useImmer({
		gameOver: false,
		whoseTurn: "x" as Turn,
		squares: Array<Turn>(9).fill(""),
	});
	const { gameOver, whoseTurn, squares } = gameState;

	function handleChoice(index: number) {
		return function () {
			if (gameOver) {
				return;
			}
			setGameState((draft) => {
				draft.squares[index] = whoseTurn;
				draft.gameOver = isGameOver(draft.squares, whoseTurn);
				draft.whoseTurn = draft.gameOver ? "" : whoseTurn === "x" ? "o" : "x";
			});
		};
	}

	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<div className="mb-40 grid grid-cols-3">
				<Square
					whoseTurn={whoseTurn}
					squareState={squares[0]}
					onChoice={handleChoice(0)}
					borderBottom
					borderRight
				/>
				<Square
					whoseTurn={whoseTurn}
					squareState={squares[1]}
					onChoice={handleChoice(1)}
					borderBottom
					borderRight
					borderLeft
				/>
				<Square
					whoseTurn={whoseTurn}
					squareState={squares[2]}
					onChoice={handleChoice(2)}
					borderBottom
					borderLeft
				/>
				<Square
					whoseTurn={whoseTurn}
					squareState={squares[3]}
					onChoice={handleChoice(3)}
					borderTop
					borderRight
					borderBottom
				/>
				<Square
					whoseTurn={whoseTurn}
					squareState={squares[4]}
					onChoice={handleChoice(4)}
					borderTop
					borderRight
					borderBottom
					borderLeft
				/>
				<Square
					whoseTurn={whoseTurn}
					squareState={squares[5]}
					onChoice={handleChoice(5)}
					borderTop
					borderBottom
					borderLeft
				/>
				<Square
					whoseTurn={whoseTurn}
					squareState={squares[6]}
					onChoice={handleChoice(6)}
					borderTop
					borderRight
				/>
				<Square
					whoseTurn={whoseTurn}
					squareState={squares[7]}
					onChoice={handleChoice(7)}
					borderTop
					borderRight
					borderLeft
				/>
				<Square
					whoseTurn={whoseTurn}
					squareState={squares[8]}
					onChoice={handleChoice(8)}
					borderTop
					borderLeft
				/>
			</div>
		</div>
	);
}

const winStates = [
	// horizontal lins
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],

	// vertical lines
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],

	// diagonal lines
	[0, 4, 8],
	[2, 4, 6],
];

function isGameOver(squares: Turn[], whoseTurn: Turn): boolean {
	return winStates.some((winState) => {
		return winState.every((i) => squares[i] == whoseTurn);
	});
}
