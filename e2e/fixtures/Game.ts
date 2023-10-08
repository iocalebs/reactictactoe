import { Locator, Page } from "@playwright/test";

type SquarePosition =
	| "Northwest"
	| "North"
	| "Northeast"
	| "West"
	| "Center"
	| "East"
	| "Southwest"
	| "South"
	| "Southeast";

export class Game {
	public readonly area: Locator;
	public readonly grid: Locator;
	public readonly playAgainButton: Locator;

	constructor(public readonly page: Page) {
		this.area = page.locator("main");
		this.grid = page.getByTestId("game-grid");
		this.playAgainButton = page.getByRole("button", { name: /play again/i });
	}

	async goto() {
		await this.page.goto("/");
	}

	async move(squarePosition: SquarePosition) {
		await this.getSquare(squarePosition).click();
	}

	getSquare(squarePosition: SquarePosition): Locator {
		return this.page.getByRole("button", {
			name: new RegExp(squarePosition + " "),
		});
	}
}
