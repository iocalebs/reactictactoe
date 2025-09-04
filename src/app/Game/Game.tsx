"use client";

import { Button } from "@/components/Button";
import { IconReset } from "@/components/Icon";
import clsx from "clsx";
import { Grid } from "./Grid";
import { TurnIndicator } from "./TurnIndicator";
import { WinLine } from "./WinLine";
import { useSelector, useDispatch } from "@/redux";
import { move, reset } from "@/redux/slices/gameSlice";
import { useState } from "react";

export function Game() {
	const dispatch = useDispatch();
	const { first, status, squares, whoseTurn, winner, winType } = useSelector(
		(state) => state.game,
	);
	const [winAnimationComplete, setWinAnimationComplete] = useState(false);

	function handleWinAnimationComplete() {
		setWinAnimationComplete(true);
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
				<Grid
					squares={squares}
					whoseTurn={whoseTurn}
					onChoice={(position) => dispatch(move(position))}
				/>
			</div>
			<div
				className={clsx(
					"mt-8 flex basis-1/5 items-center sm:basis-auto",
					winAnimationComplete || status === "draw"
						? "animate-fade-in visible"
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
					onClick={() => dispatch(reset())}
				>
					Play again
				</Button>
			</div>
		</div>
	);
}
