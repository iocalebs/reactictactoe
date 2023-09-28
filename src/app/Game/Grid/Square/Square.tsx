import { memo } from "react";

import { Turn } from "@/types";
import "./Square.css";

interface ShapeProps {
	hover?: boolean;
}

const X = memo(function X({ hover }: ShapeProps) {
	return (
		<svg
			viewBox="0 0 50 50"
			height={100}
			width={100}
			strokeWidth={3}
			className={
				"stroke-black dark:stroke-white" +
				(hover ? " hover-shape" : " x--animated")
			}
		>
			<g>
				<line id="x1" x1="8.5" y1="41.5" x2="41.5" y2="8.5" />
				<line id="x2" x1="41.5" y1="41.5" x2="8.5" y2="8.5" />
			</g>
		</svg>
	);
});

const O = memo(function O({ hover }: ShapeProps) {
	return (
		<svg
			viewBox="0 0 100 100"
			height={85}
			width={85}
			aria-hidden={hover}
			className={
				"stroke-black dark:stroke-white" +
				(hover ? " hover-shape" : " o--animated")
			}
		>
			<circle
				cx="50"
				cy="50"
				r="45"
				fill="none"
				strokeWidth={8}
				transform="rotate(-90, 50, 50)"
			/>
		</svg>
	);
});

export interface SquareProps {
	whoseTurn: Turn;
	squareState: Turn;
	borderTop?: boolean;
	borderRight?: boolean;
	borderLeft?: boolean;
	borderBottom?: boolean;
	onChoice: (turn: Turn) => void;
}
export function Square({
	whoseTurn,
	squareState,
	borderTop,
	borderRight,
	borderLeft,
	borderBottom,
	onChoice,
}: SquareProps) {
	function contents() {
		switch (squareState) {
			case "x":
				return <X />;
			case "o":
				return <O />;
			case "":
				// if game  over
				if (whoseTurn === "") {
					return "";
				} else {
					return whoseTurn == "x" ? <X hover /> : <O hover />;
				}
		}
	}

	function handleClick() {
		if (squareState !== "") {
			return;
		}
		onChoice(whoseTurn);
	}

	const borders = [
		"border-t-4" + (borderTop ? "" : " border-t-transparent"),
		"border-r-4" + (borderRight ? "" : " border-r-transparent"),
		"border-b-4" + (borderBottom ? "" : " border-b-transparent"),
		"border-l-4" + (borderLeft ? "" : " border-l-transparent"),
	].join(" ");

	return (
		<div
			className={borders + " group h-40 w-40 border-gray-400"}
			onClick={handleClick}
		>
			<div
				className={
					"flex h-full w-full items-center justify-center" +
					(squareState == "" && whoseTurn !== "" ? " cursor-pointer" : "")
				}
			>
				{contents()}
			</div>
		</div>
	);
}
