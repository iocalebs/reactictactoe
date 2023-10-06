/* This component could probably be simplified by using the background property with linear-gradient */

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./WinLine.module.scss";

const FINAL_DASH_COUNT = 14;
const DASH_GAP_FACTOR = 0.4; // length of the gap as a percentage of the dash length
const DASH_ANIMATION_INTERVAL_MS = 60;
const DASH_ANIMATION_START_DELAY_MS = 600;

export type WinType =
	| "Top"
	| "Bottom"
	| "Left"
	| "Right"
	| "CenterVertical"
	| "CenterHorizontal"
	| "TopLeftBottomRight"
	| "TopRightBottomLeft";

export interface WinLineProps {
	reduceMotion: boolean;
	winType: WinType;
	onAnimationComplete: () => void;
}

export function WinLine({
	reduceMotion,
	winType,
	onAnimationComplete,
}: WinLineProps) {
	const [dashCount, setDashCount] = useState(0);
	const [lineLength, setLineLength] = useState<number | null>(null);
	const lineRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const updateLineLength = () => {
			let lineLength = lineRef?.current?.getBoundingClientRect()?.width || null;
			if (
				winType === "TopLeftBottomRight" ||
				winType === "TopRightBottomLeft"
			) {
				lineLength = lineLength && lineLength * Math.sqrt(2);
			}
			setLineLength(lineLength);
		};
		updateLineLength();
		window.addEventListener("resize", updateLineLength);
		return () => window.removeEventListener("resize", updateLineLength);
	}, [winType]);

	useEffect(() => {
		const delay =
			dashCount == 0
				? DASH_ANIMATION_START_DELAY_MS
				: DASH_ANIMATION_INTERVAL_MS;
		if (reduceMotion && dashCount < FINAL_DASH_COUNT) {
			setDashCount(FINAL_DASH_COUNT);
		} else if (dashCount < FINAL_DASH_COUNT) {
			const timeout = setTimeout(() => {
				setDashCount(dashCount + 1);
			}, delay);
			return () => clearTimeout(timeout);
		} else {
			onAnimationComplete();
		}
	}, [reduceMotion, dashCount, onAnimationComplete]);

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
		<>
			<span aria-live="polite" className="sr-only">
				{"Winning line: " + getLineDescription(winType)}
			</span>
			<div aria-hidden className="absolute h-full w-full" ref={lineRef}>
				<div className={getWinLineClass(winType)}>
					<div
						data-testid="winline-inner"
						className={clsx("flex flex-col", reduceMotion && "animate-fade-in")}
					>
						{dashes}
					</div>
				</div>
			</div>
		</>
	);
}

function getWinLineClass(winType: WinType): string {
	switch (winType) {
		case "Top":
			return styles.WinLineTop;
		case "Bottom":
			return styles.WinLineBottom;
		case "Left":
			return styles.WinLineLeft;
		case "Right":
			return styles.WinLineRight;
		case "CenterHorizontal":
			return styles.WinLineCenterHorizontal;
		case "CenterVertical":
			return styles.WinLineCenterVertical;
		case "TopLeftBottomRight":
			return styles.WinLineTopLeftBottomRight;
		case "TopRightBottomLeft":
			return styles.WinLineTopRightBottomLeft;
	}
}

function getLineDescription(winType: WinType): string {
	switch (winType) {
		case "Top":
			return "Top horizontal";
		case "Bottom":
			return "Bottom horizontal";
		case "Left":
			return "Left vertical";
		case "Right":
			return "Right vertical";
		case "CenterHorizontal":
			return "Center horizontal";
		case "CenterVertical":
			return "Center vertical";
		case "TopLeftBottomRight":
			return "Top left to bottom right diagonal";
		case "TopRightBottomLeft":
			return "Top right to bottom left diagonal";
	}
}
/* istanbul ignore file */
