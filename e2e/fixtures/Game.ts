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
	public readonly grid: Locator;

	constructor(public readonly page: Page) {
		this.grid = page.getByTestId("grid");
	}

	async goto() {
		await this.page.goto("/");
	}

	async move(squarePosition: SquarePosition) {
		await this.page
			.getByRole("button", { name: new RegExp(squarePosition + " ") })
			.click();
	}
}
