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
				return x;
			case "o":
				return o;
			case "":
				// if game  over
				if (whoseTurn === "") {
					return "";
				} else {
					return (
						<div
							aria-hidden
							className="opacity-0 transition-opacity group-hover:visible group-hover:opacity-10 dark:group-hover:opacity-20"
						>
							{whoseTurn == "x" ? x : o}
						</div>
					);
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
					"flex h-full w-full items-center justify-center " +
					(squareState == "" && whoseTurn !== "" ? "cursor-pointer" : "")
				}
			>
				{contents()}
			</div>
		</div>
	);
}
