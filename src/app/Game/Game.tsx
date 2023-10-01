"use client";

import { useImmer } from "use-immer";
import { Button } from "@/components/Button";
import { IconReset } from "@/components/Icon";
import { Turn } from "@/types";
import { Grid } from "./Grid";
import { WinLine } from "./WinLine";

export function Game() {
	const [gameState, setGameState] = useImmer({
		gameOver: false,
		squares: Array<Turn>(9).fill(""),
		whoseTurn: "x" as Turn,
	});
	const { gameOver, squares, whoseTurn } = gameState;

	function handleChoice(square: number) {
		if (gameOver || squares[square] !== "") {
			return;
		}
		setGameState((draft) => {
			draft.squares[square] = whoseTurn;
			draft.gameOver = isGameOver(draft.squares, whoseTurn);
			draft.whoseTurn = draft.gameOver ? "" : whoseTurn === "x" ? "o" : "x";
		});
	}

	function reset() {
		setGameState((draft) => {
			draft.squares = Array<Turn>(9).fill("");
			draft.gameOver = false;
			draft.whoseTurn = "x";
		});
	}

	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-10">
			<div className="relative">
				<WinLine />
				<div className="m-8">
					<Grid
						squares={squares}
						whoseTurn={whoseTurn}
						onChoice={handleChoice}
					/>
				</div>
			</div>
			<div className={gameOver ? "" : "invisible"}>
				<Button icon={<IconReset />} onClick={reset}>
					Reset
				</Button>
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
		return (
			winState.every((i) => squares[i] == whoseTurn) ||
			squares.every((square) => square !== "")
		);
	});
}
