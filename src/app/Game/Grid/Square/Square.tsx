import { type SquarePosition, type Turn } from "@/redux/slices/gameSlice";
import { clsx } from "clsx";
import { useState } from "react";
import styles from "./Square.module.scss";

const x = (
	<svg
		viewBox="0 0 100 100"
		width="90%"
		strokeWidth={8}
		className="stroke-black dark:stroke-white"
	>
		<g>
			<line x1="0" y1="0" x2="100" y2="100" />
			<line x1="100" y1="0" x2="0" y2="100" />
		</g>
	</svg>
);

const o = (
	<svg
		viewBox="0 0 100 100"
		strokeWidth={8}
		width="100%"
		className="stroke-black dark:stroke-white"
	>
		<circle cx="50" cy="50" r="46" fill="none" />
	</svg>
);

export interface SquareProps {
	position: SquarePosition;
	whoseTurn: Turn;
	value: Turn;
	onChoice: () => void;
}
export function Square({
	position,
	whoseTurn,
	value: squareValue,
	onChoice,
}: SquareProps) {
	const [hover, setHover] = useState(false);

	const openSquare = whoseTurn !== "" && squareValue === "";
	const hoveringOpenSquare = hover && openSquare;

	let squareContent;
	if (hoveringOpenSquare) {
		squareContent = whoseTurn === "x" ? x : o;
	} else if (squareValue !== "") {
		squareContent = squareValue === "x" ? x : o;
	} else {
		squareContent = "";
	}

	const squareValueLabel = squareValue === "" ? "Empty" : squareValue;
	const ariaLabel = `${position} square... ${squareValueLabel}`;

	return (
		<div
			className={clsx(
				"flex aspect-square h-full w-full justify-center border-gray-400 select-none",
				!position.match(/north/i) && "border-t-4",
				!position.match(/east/i) && "border-r-4",
				!position.match(/south/i) && "border-b-4",
				!position.match(/west/i) && "border-l-4",
			)}
		>
			<button
				aria-label={ariaLabel}
				// We avoid setting `disabled` so that keyboards can focus on filled
				// squares and screen readers can to read out their contents
				aria-disabled={!openSquare}
				className={clsx(
					"flex h-full w-full items-center justify-center p-[15%]",
					squareValue == "x" && styles.X,
					squareValue == "o" && styles.O,
					hoveringOpenSquare && "opacity-10 dark:opacity-20",
					!openSquare && "cursor-default",
				)}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
				onClick={onChoice}
			>
				{squareContent}
			</button>
		</div>
	);
}
