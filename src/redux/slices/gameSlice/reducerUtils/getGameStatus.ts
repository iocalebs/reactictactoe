import {
	GameStatus,
	Player,
	SquarePosition,
	SquareValues,
	WinType,
} from "../gameTypes";

const winStates: Record<WinType, SquarePosition[]> = {
	Top: ["Northwest", "North", "Northeast"],
	CenterHorizontal: ["West", "Center", "East"],
	Bottom: ["Southwest", "South", "Southeast"],

	Left: ["Northwest", "West", "Southwest"],
	CenterVertical: ["North", "Center", "South"],
	Right: ["Northeast", "East", "Southeast"],

	TopLeftBottomRight: ["Northwest", "Center", "Southeast"],
	TopRightBottomLeft: ["Northeast", "Center", "Southwest"],
};

export function getGameStatus(
	currentSquares: SquareValues,
	whoseTurn: Player | "",
): [GameStatus, WinType?] {
	const winState = Object.entries(winStates).find(([, winStateSquares]) => {
		return winStateSquares.every(
			(squarePosition) => currentSquares[squarePosition] == whoseTurn,
		);
	});
	if (winState) {
		return ["won", winState[0] as WinType];
	}
	const allSquaresFilled = Object.values(currentSquares).every(
		(square) => square !== "",
	);
	return [allSquaresFilled ? "draw" : "playing"];
}
