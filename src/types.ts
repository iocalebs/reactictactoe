export type Player = "x" | "o";
export type GameStatus = "won" | "draw" | "playing";
export type Turn = Player | "";

export const squarePositions = [
	"Northwest",
	"North",
	"Northeast",
	"West",
	"Center",
	"East",
	"Southwest",
	"South",
	"Southeast",
] as const;

export type SquarePosition = (typeof squarePositions)[number];

export type WinType =
	| "Top"
	| "Bottom"
	| "Left"
	| "Right"
	| "CenterVertical"
	| "CenterHorizontal"
	| "TopLeftBottomRight"
	| "TopRightBottomLeft";

export type SquareValues = Record<SquarePosition, Turn>;

export type GameState = {
	first: Player;
	squares: SquareValues;
	status: GameStatus;
	whoseTurn: Turn;
	winner?: Player;
	winAnimationComplete: boolean;
	winType?: WinType;
};
