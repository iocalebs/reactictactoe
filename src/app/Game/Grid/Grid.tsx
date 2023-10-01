"use client";

import { Turn } from "@/types";
import { Square } from "./Square";

export interface GridProps {
	squares: Turn[];
	whoseTurn: Turn;
	onChoice: (square: number) => void;
}

export function Grid({ squares, whoseTurn, onChoice }: GridProps) {
	const handleChoice = (square: number) => () => onChoice(square);
	return (
		<div className="mx-8 grid aspect-square max-w-lg grid-cols-3">
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
	);
}
