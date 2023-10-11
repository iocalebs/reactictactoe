import clsx from "clsx";
import styles from "./WinLine.module.scss";
import { WinType } from "@/redux/slices/gameSlice";

export interface WinLineProps {
	winType: WinType;
	onAnimationEnd: () => void;
}

export function WinLine({ winType, onAnimationEnd }: WinLineProps) {
	return (
		<>
			<span aria-live="polite" className="sr-only">
				{"Winning line: " + getLineDescription(winType)}
			</span>
			<div
				data-testid="win-line"
				onAnimationEnd={onAnimationEnd}
				className={clsx(getWinLineClass(winType))}
			></div>
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
