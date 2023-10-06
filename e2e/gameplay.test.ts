import { test as base, Page, expect } from "@playwright/test";
import { Game } from "./fixtures/Game";

const test = base.extend<{ game: Game }>({
	game: async ({ page }, use) => {
		const game = new Game(page);
		await game.goto();
		await use(game);
	},
});

test("X wins via left vertical", async ({ game }) => {
	await game.move("Northwest");
	await game.move("North");
	await game.move("West");
	await game.move("Center");
	await game.move("Southwest");

	await expect(game.grid).toHaveScreenshot("win-left-vertical.png");
});

test("O wins via middle vertical", async ({ game }) => {
	await game.move("Northwest");
	await game.move("North");
	await game.move("West");
	await game.move("Center");
	await game.move("Southeast");
	await game.move("South");

	await expect(game.grid).toHaveScreenshot("win-middle-vertical.png");
});

test("X wins via top horizontal", async ({ game }) => {
	await game.move("Northwest");
	await game.move("West");
	await game.move("North");
	await game.move("Center");
	await game.move("Northeast");

	await expect(game.grid).toHaveScreenshot("win-top-horizontal.png");
});

test("O wins via middle horizontal", async ({ game }) => {
	await game.move("Northwest");
	await game.move("West");
	await game.move("North");
	await game.move("Center");
	await game.move("Southeast");
	await game.move("East");

	await expect(game.grid).toHaveScreenshot("win-center-horizontal.png");
});
