import { Turn } from "@/types";
import { XO } from "./XO";

export interface SquareProps {
	whoseTurn: Turn;
	squareState: Turn;
	borderTop?: boolean;
	borderRight?: boolean;
	borderLeft?: boolean;
	borderBottom?: boolean;
	onChoice: () => void;
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
	const borders = [
		"border-t-4" + (borderTop ? "" : " border-t-transparent"),
		"border-r-4" + (borderRight ? "" : " border-r-transparent"),
		"border-b-4" + (borderBottom ? "" : " border-b-transparent"),
		"border-l-4" + (borderLeft ? "" : " border-l-transparent"),
	].join(" ");

	function squareContents() {
		if (squareState == "" && whoseTurn == "") {
			return "";
		}
		if (squareState == "" && whoseTurn != "") {
			return <XO shape={whoseTurn} hover />;
		}
		if (squareState !== "") {
			return <XO shape={squareState} />;
		}
	}

	return (
		<div
			className={borders + " group h-40 w-40 border-gray-400"}
			onClick={onChoice}
		>
			<div
				className={
					"flex h-full w-full items-center justify-center" +
					(squareState == "" && whoseTurn !== "" ? " cursor-pointer" : "")
				}
			>
				{squareContents()}
			</div>
		</div>
	);
}
