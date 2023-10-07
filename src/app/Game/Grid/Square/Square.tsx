import { Turn } from "@/types";
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

type PositionX = "left" | "center" | "right";
type PositionY = "top" | "center" | "bottom";

export interface SquareProps {
	whoseTurn: Turn;
	value: Turn;
	positionX: PositionX;
	positionY: PositionY;
	borderTop?: boolean;
	borderRight?: boolean;
	borderLeft?: boolean;
	borderBottom?: boolean;
	onChoice: () => void;
}
export function Square({
	positionX,
	positionY,
	whoseTurn,
	value,
	onChoice,
}: SquareProps) {
	const [hover, setHover] = useState(false);

	const hoveringOpenSquare = hover && whoseTurn !== "" && value == "";

	let squareContent;
	if (hoveringOpenSquare) {
		squareContent = whoseTurn === "x" ? x : o;
	} else if (value == "") {
		squareContent = "";
	} else {
		squareContent = value === "x" ? x : o;
	}

	const clickable = value === "" && whoseTurn !== "";

	return (
		<div
			className={clsx(
				"flex aspect-square h-full w-full select-none justify-center border-gray-400",
				positionY !== "top" && "border-t-4",
				positionY !== "bottom" && "border-b-4",
				positionX !== "left" && "border-l-4",
				positionX !== "right" && "border-r-4",
			)}
		>
			<button
				aria-label={ariaLabel(positionX, positionY, value)}
				// We avoid setting `disabled` so that keyboards can focus on filled
				// squares and screen readers can to read out their contents
				aria-disabled={!clickable}
				className={clsx(
					"flex h-full w-full items-center justify-center p-[15%]",
					value == "x" && styles.X,
					value == "o" && styles.O,
					hoveringOpenSquare && "opacity-10 dark:opacity-20",
					!clickable && "cursor-default",
				)}
				onClick={onChoice}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				{squareContent}
			</button>
		</div>
	);
}

function ariaLabel(positionX: PositionX, positionY: PositionY, value: Turn) {
	return `
		${positionLabel(positionX, positionY)} square...
		${squareStateLabel(value)}...
	`;
}

function positionLabel(positionX: PositionX, positionY: PositionY): string {
	switch (positionY) {
		case "top": {
			switch (positionX) {
				case "left":
					return "Northwest";
				case "center":
					return "North";
				case "right":
					return "Northeast";
			}
		}
		case "center": {
			switch (positionX) {
				case "left":
					return "West";
				case "center":
					return "Center";
				case "right":
					return "East";
			}
		}
		case "bottom": {
			switch (positionX) {
				case "left":
					return "Southwest";
				case "center":
					return "South";
				case "right":
					return "Southeast";
			}
		}
	}
}

function squareStateLabel(value: Turn): string {
	if (value === "") {
		return "Empty";
	} else {
		return value;
	}
}
