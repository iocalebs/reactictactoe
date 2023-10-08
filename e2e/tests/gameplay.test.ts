import { test as base, Page, expect } from "@playwright/test";
import { Game } from "../fixtures/Game";

const test = base.extend<{ game: Game }>({
	game: async ({ page }, use) => {
		const game = new Game(page);
		await game.goto();
		await use(game);
	},
});

test.describe("move restrictions", () => {
	test("a square can only be selected once", async ({ game }) => {
		const southSquare = game.getSquare("South");
		await expect(southSquare).not.toBeDisabled();
		await expect(southSquare).toHaveCSS("cursor", "pointer");

		await game.move("South");

		expect(southSquare.getByLabel(/X/)).not.toBeNull();
		await expect(southSquare).toBeDisabled();
		await expect(southSquare).toHaveCSS("cursor", "default");
	});

	test("an open square cannot be selected when the game has ended in a win", async ({
		game,
	}) => {
		await game.move("Northwest");
		await game.move("West");
		await game.move("North");
		await game.move("Center");
		await game.move("Northeast");

		await expect(game.getSquare("South")).toBeDisabled();
	});
});

test.describe("'play again' button", () => {
	test("is invisible at the start of the game", async ({ game }) => {
		await expect(game.playAgainButton).toBeHidden();
	});

	test("is invisible while game is in progress", async ({ game }) => {
		await game.move("Center");
		await expect(game.playAgainButton).toBeHidden();
	});

	test("is visible after a win", async ({ game }) => {
		await game.move("Northeast");
		await game.move("North");
		await game.move("East");
		await game.move("Center");
		await game.move("Southeast"); // X wins

		await expect(game.playAgainButton).toBeVisible();
	});

	test("is visible after a draw", async ({ game }) => {
		await game.move("Southeast");
		await game.move("Center");
		await game.move("West");
		await game.move("Southwest");
		await game.move("Northeast");
		await game.move("Northwest");
		await game.move("North");
		await game.move("East");
		await game.move("South");

		await expect(game.playAgainButton).toBeVisible();
	});

	test("grants the first turn to O after 1 reset", async ({ game }) => {
		await game.move("Northwest");
		await game.move("North");
		await game.move("West");
		await game.move("Center");
		await game.move("Southwest"); // X wins
		await game.playAgainButton.click();

		await expect(game.page.getByText(/X's turn/)).not.toBeVisible();
		await expect(game.page.getByText(/O's turn/)).toBeVisible();
	});

	test("grants the first turn to X after 2 resets", async ({ game }) => {
		await game.move("Northwest");
		await game.move("West");
		await game.move("North");
		await game.move("Center");
		await game.move("Northeast"); // X wins
		await game.playAgainButton.click();
		await game.move("Northwest");
		await game.move("North");
		await game.move("West");
		await game.move("Center");
		await game.move("Southwest"); // O wins
		await game.playAgainButton.click();

		await expect(game.page.getByText(/O's turn/)).not.toBeVisible();
		await expect(game.page.getByText(/X's turn/)).toBeVisible();
	});
});

test.describe("screenshots", () => {
	test("initial board - X's turn", async ({ game }) => {
		await expect(game.page.getByText(/X's turn/)).toBeVisible();
		await expect(game.area).toHaveScreenshot("initital.png");
	});

	test("first move made - O's turn", async ({ game }) => {
		await game.move("North");
		await expect(game.page.getByText(/O's turn/)).toBeVisible();
		await expect(game.area).toHaveScreenshot("first-move.png");
	});

	test("game ends in draw", async ({ game }) => {
		await game.move("South");
		await game.move("Southwest");
		await game.move("Northwest");
		await game.move("Center");
		await game.move("Northeast");
		await game.move("North");
		await game.move("West");
		await game.move("Southeast");
		await game.move("East");

		await expect(game.playAgainButton).toBeVisible();

		await expect(game.page.getByText(/draw/i)).toBeVisible();
		await expect(game.area).toHaveScreenshot("draw.png");
	});

	test("X wins via left vertical", async ({ game }) => {
		await game.move("Northwest");
		await game.move("North");
		await game.move("West");
		await game.move("Center");
		await game.move("Southwest");

		await expect(game.page.getByText(/x wins/i)).toBeVisible();
		await expect(game.page.getByText(/left vertical/i)).toBeVisible();
		await expect(game.grid).toHaveScreenshot("win-left-vertical.png");
	});

	test("O wins via center vertical", async ({ game }) => {
		await game.move("Northwest");
		await game.move("North");
		await game.move("West");
		await game.move("Center");
		await game.move("Southeast");
		await game.move("South");

		await expect(game.page.getByText(/o wins/i)).toBeVisible();
		await expect(game.page.getByText(/center vertical/i)).toBeVisible();
		await expect(game.grid).toHaveScreenshot("win-center-vertical.png");
	});

	test("X wins via right vertical", async ({ game }) => {
		await game.move("Northeast");
		await game.move("North");
		await game.move("East");
		await game.move("Center");
		await game.move("Southeast");

		await expect(game.page.getByText(/x wins/i)).toBeVisible();
		await expect(game.page.getByText(/right vertical/i)).toBeVisible();
		await expect(game.grid).toHaveScreenshot("win-right-vertical.png");
	});

	test("X wins via top horizontal", async ({ game }) => {
		await game.move("Northwest");
		await game.move("West");
		await game.move("North");
		await game.move("Center");
		await game.move("Northeast");

		await expect(game.page.getByText(/x wins/i)).toBeVisible();
		await expect(game.page.getByText(/top horizontal/i)).toBeVisible();
		await expect(game.grid).toHaveScreenshot("win-top-horizontal.png");
	});

	test("O wins via center horizontal", async ({ game }) => {
		await game.move("Northwest");
		await game.move("West");
		await game.move("North");
		await game.move("Center");
		await game.move("Southeast");
		await game.move("East");

		await expect(game.page.getByText(/o wins/i)).toBeVisible();
		await expect(game.page.getByText(/center horizontal/i)).toBeVisible();
		await expect(game.grid).toHaveScreenshot("win-center-horizontal.png");
	});

	test("X wins via bottom horizontal", async ({ game }) => {
		await game.move("Southeast");
		await game.move("East");
		await game.move("Southwest");
		await game.move("Center");
		await game.move("South");

		await expect(game.page.getByText(/x wins/i)).toBeVisible();
		await expect(game.page.getByText(/bottom horizontal/i)).toBeVisible();
		await expect(game.grid).toHaveScreenshot("win-bottom-horizontal.png");
	});

	test("O wins via top left to bottom right diagonal", async ({ game }) => {
		await game.move("South");
		await game.move("Southeast");
		await game.move("North");
		await game.move("Center");
		await game.move("Southwest");
		await game.move("Northwest");

		await expect(game.page.getByText(/o wins/i)).toBeVisible();
		await expect(game.page.getByText(/diagonal/i)).toBeVisible();
		await expect(game.grid).toHaveScreenshot("win-top-left-diagonal.png");
	});

	test("X wins via top right to bottom left diagonal", async ({ game }) => {
		await game.move("Northeast");
		await game.move("North");
		await game.move("Center");
		await game.move("South");
		await game.move("Southwest");

		await expect(game.page.getByText(/x wins/i)).toBeVisible();
		await expect(game.page.getByText(/diagonal/i)).toBeVisible();
		await expect(game.grid).toHaveScreenshot("win-top-right-diagonal.png");
	});
});
