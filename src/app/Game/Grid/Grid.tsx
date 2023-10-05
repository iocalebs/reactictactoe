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
		<div className="m-8 grid aspect-square w-full grid-cols-3">
			<Square
				positionY="top"
				positionX="left"
				value={squares[0]}
				whoseTurn={whoseTurn}
				onChoice={handleChoice(0)}
			/>
			<Square
				positionY="top"
				positionX="center"
				value={squares[1]}
				whoseTurn={whoseTurn}
				onChoice={handleChoice(1)}
			/>
			<Square
				positionY="top"
				positionX="right"
				value={squares[2]}
				whoseTurn={whoseTurn}
				onChoice={handleChoice(2)}
			/>
			<Square
				positionY="center"
				positionX="left"
				value={squares[3]}
				whoseTurn={whoseTurn}
				onChoice={handleChoice(3)}
			/>
			<Square
				positionY="center"
				positionX="center"
				value={squares[4]}
				whoseTurn={whoseTurn}
				onChoice={handleChoice(4)}
			/>
			<Square
				positionY="center"
				positionX="right"
				value={squares[5]}
				whoseTurn={whoseTurn}
				onChoice={handleChoice(5)}
			/>
			<Square
				positionY="bottom"
				positionX="left"
				value={squares[6]}
				whoseTurn={whoseTurn}
				onChoice={handleChoice(6)}
			/>
			<Square
				positionY="bottom"
				positionX="center"
				value={squares[7]}
				whoseTurn={whoseTurn}
				onChoice={handleChoice(7)}
			/>
			<Square
				positionY="bottom"
				positionX="right"
				value={squares[8]}
				whoseTurn={whoseTurn}
				onChoice={handleChoice(8)}
			/>
		</div>
	);
}
