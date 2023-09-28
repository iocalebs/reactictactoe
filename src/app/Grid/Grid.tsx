"use client";

import { useState } from "react";
import { useImmer } from "use-immer";

import { Turn } from "@/types";
import { Square } from "./Square";

export function Grid() {
	const [whoseTurn, setWhoseTurn] = useState<Turn>("x");
	const [gridState, setGridState] = useImmer(Array<Turn>(9).fill(""));

	function handleChoice(index: number) {
		return function (player: Turn) {
			setGridState((draft) => {
				draft[index] = player;
			});
			if (player == "x") {
				setWhoseTurn("o");
			} else {
				setWhoseTurn("x");
			}
		};
	}

	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<div className="mb-40 grid grid-cols-3">
				<Square
					whoseTurn={whoseTurn}
					state={gridState[0]}
					onChoice={handleChoice(0)}
					borderBottom
					borderRight
				/>
				<Square
					whoseTurn={whoseTurn}
					state={gridState[1]}
					onChoice={handleChoice(1)}
					borderBottom
					borderRight
					borderLeft
				/>
				<Square
					whoseTurn={whoseTurn}
					state={gridState[2]}
					onChoice={handleChoice(2)}
					borderBottom
					borderLeft
				/>
				<Square
					whoseTurn={whoseTurn}
					state={gridState[3]}
					onChoice={handleChoice(3)}
					borderTop
					borderRight
					borderBottom
				/>
				<Square
					whoseTurn={whoseTurn}
					state={gridState[4]}
					onChoice={handleChoice(4)}
					borderTop
					borderRight
					borderBottom
					borderLeft
				/>
				<Square
					whoseTurn={whoseTurn}
					state={gridState[5]}
					onChoice={handleChoice(5)}
					borderTop
					borderBottom
					borderLeft
				/>
				<Square
					whoseTurn={whoseTurn}
					state={gridState[6]}
					onChoice={handleChoice(6)}
					borderTop
					borderRight
				/>
				<Square
					whoseTurn={whoseTurn}
					state={gridState[7]}
					onChoice={handleChoice(7)}
					borderTop
					borderRight
					borderLeft
				/>
				<Square
					whoseTurn={whoseTurn}
					state={gridState[8]}
					onChoice={handleChoice(8)}
					borderTop
					borderLeft
				/>
			</div>
		</div>
	);
}
