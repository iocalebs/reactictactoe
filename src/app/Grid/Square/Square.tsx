import { Turn } from "@/types";

const x = (
	<svg
		viewBox="0 0 100 100"
		height={90}
		width={90}
		className="fill-black dark:fill-white"
	>
		<g transform="rotate(45, 50, 50)">
			<rect x="45" y="0" width="10" height="100" />
			<rect x="0" y="45" width="100" height="10" />
		</g>
	</svg>
);

const o = (
	<svg
		viewBox="0 0 100 100"
		height={85}
		width={85}
		className="stroke-black dark:stroke-white"
	>
		<circle cx="50" cy="50" r="45" fill="none" strokeWidth={8} />
	</svg>
);

export interface SquareProps {
	whoseTurn: Turn;
	state: Turn;
	borderTop?: boolean;
	borderRight?: boolean;
	borderLeft?: boolean;
	borderBottom?: boolean;
	onChoice: (turn: Turn) => void;
}
export function Square({
	whoseTurn,
	state,
	borderTop,
	borderRight,
	borderLeft,
	borderBottom,
	onChoice,
}: SquareProps) {
	function contents() {
		switch (state) {
			case "x":
				return x;
			case "o":
				return o;
			case "":
				return null;
		}
	}

	function handleClick() {
		if (state !== "") {
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
			className={
				borders + " flex h-40 w-40 items-center justify-center border-gray-400"
			}
			onClick={handleClick}
		>
			{contents()}
		</div>
	);
}
