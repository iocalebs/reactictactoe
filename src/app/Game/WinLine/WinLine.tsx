import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./WinLine.module.scss";

const FINAL_DASH_COUNT = 14;
const DASH_GAP_FACTOR = 0.4; // length of the gap as a percentage of the dash length
const DASH_ANIMATION_INTERVAL_MS = 60;
const DASH_ANIMATION_START_DELAY_MS = 600;

export type WinState =
	| "Top"
	| "Bottom"
	| "Left"
	| "Right"
	| "MiddleVertical"
	| "MiddleHorizontal"
	| "TopLeftBottomRight"
	| "TopRightBottomLeft";

export interface WinLineProps {
	winState: WinState;
	onAnimationComplete: () => void;
}

export function WinLine({ winState, onAnimationComplete }: WinLineProps) {
	const [dashCount, setDashCount] = useState(0);
	const [lineLength, setLineLength] = useState<number | null>(null);
	const lineRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		function updateLineLength() {
			let lineLength = lineRef?.current?.getBoundingClientRect()?.width || null;
			if (
				winState === "TopLeftBottomRight" ||
				winState === "TopRightBottomLeft"
			) {
				lineLength = lineLength && lineLength * Math.sqrt(2);
			}
			setLineLength(lineLength);
		}
		updateLineLength();
		window.addEventListener("resize", updateLineLength);
		return () => window.removeEventListener("resize", updateLineLength);
	}, [winState]);

	useEffect(() => {
		const delay =
			dashCount == 0
				? DASH_ANIMATION_START_DELAY_MS
				: DASH_ANIMATION_INTERVAL_MS;
		if (dashCount < FINAL_DASH_COUNT) {
			const timeout = setTimeout(() => {
				setDashCount(dashCount + 1);
			}, delay);
			return () => clearTimeout(timeout);
		} else {
			onAnimationComplete();
		}
	}, [dashCount, onAnimationComplete]);

	let dashSize = 0;
	let dashGapSize = 0;
	if (lineLength) {
		dashSize =
			lineLength /
			(FINAL_DASH_COUNT + FINAL_DASH_COUNT * DASH_GAP_FACTOR - DASH_GAP_FACTOR);
		dashGapSize = dashSize * DASH_GAP_FACTOR;
	}

	const dashes =
		lineLength &&
		[...Array(dashCount)].map((e, i) => {
			return (
				<div
					className="aspect-[1/4] flex-shrink-0 bg-red-500"
					key={i}
					style={{
						height: `${dashSize}px`,
						marginBottom:
							i === FINAL_DASH_COUNT - 1 ? undefined : `${dashGapSize}px`,
					}}
				/>
			);
		});

	return (
		<div className="absolute h-full w-full" ref={lineRef}>
			<div className={getWinLineClass(winState)}>
				<div className="flex flex-col">{dashes}</div>
			</div>
		</div>
	);
}

function getWinLineClass(winState: WinState): string {
	switch (winState) {
		case "Top":
			return styles.WinLineTop;
		case "Bottom":
			return styles.WinLineBottom;
		case "Left":
			return styles.WinLineLeft;
		case "Right":
			return styles.WinLineRight;
		case "MiddleHorizontal":
			return styles.WinLineMiddleHorizontal;
		case "MiddleVertical":
			return styles.WinLineMiddleVertical;
		case "TopLeftBottomRight":
			return styles.WinLineTopLeftBottomRight;
		case "TopRightBottomLeft":
			return styles.WinLineTopRightBottomLeft;
	}
}
