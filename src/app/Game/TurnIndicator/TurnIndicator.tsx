import { Turn } from "@/redux/slices/gameSlice";
import clsx from "clsx";

const x = (
	<svg
		viewBox="0 0 100 100"
		width="90%"
		strokeWidth={16}
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
		strokeWidth={16}
		className="stroke-black dark:stroke-white"
	>
		<circle cx="50" cy="50" r="42" fill="none" />
	</svg>
);

export interface TurnIndicatorProps {
	whoseTurn: Turn;
}

export function TurnIndicator({ whoseTurn }: TurnIndicatorProps) {
	return (
		<>
			{whoseTurn !== "" && (
				<span aria-live="polite" className="sr-only">
					{whoseTurn === "x" ? "It is now X's turn" : "It is now O's turn"}
				</span>
			)}
			<span
				aria-hidden
				className={clsx(
					"flex items-center gap-1",
					whoseTurn === "" ? "invisible" : "visible",
				)}
			>
				<div className="inline-block h-4 w-4">
					{whoseTurn !== "" && (whoseTurn === "x" ? x : o)}
				</div>
				Turn
			</span>
		</>
	);
}
