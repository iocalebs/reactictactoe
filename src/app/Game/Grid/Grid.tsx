"use client";

import { Square } from "./Square";
import {
	squarePositions,
	type SquarePosition,
	SquareValues,
	Turn,
} from "@/redux/slices/gameSlice";

export interface GridProps {
	squares: SquareValues;
	whoseTurn: Turn;
	onChoice: (square: SquarePosition) => void;
}

export function Grid({ squares, whoseTurn, onChoice }: GridProps) {
	return (
		<div className="m-8 grid w-full grid-cols-3">
			{squarePositions.map((squarePosition) => (
				<Square
					key={squarePosition}
					position={squarePosition}
					value={squares[squarePosition]}
					whoseTurn={whoseTurn}
					onChoice={() => onChoice(squarePosition)}
				/>
			))}
		</div>
	);
}
