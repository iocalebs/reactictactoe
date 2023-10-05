import { render, screen, act } from "@testing-library/react";
import { Game } from ".";

describe("<Game />", () => {
	beforeEach(() => {
		window.matchMedia = jest.fn().mockImplementation((query) => ({
			matches: true,
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
		}));
	});

	it("starts with a blank grid and grants the first turn to X", () => {
		render(<Game />);
		const emptySpaces = screen.getAllByRole("button", {
			name: /square(.*)empty/i,
		});
		expect(emptySpaces.length).toBe(9);
		expect(screen.getByText(/X's turn/i)).not.toBeNull();
	});

	it("fills a selected square when empty on selection", () => {
		render(<Game />);
		act(() => {
			screen.getByRole("button", { name: /northwest square/i }).click();
		});
		const emptySquares = screen.getAllByRole("button", {
			name: /square(.*)empty/i,
		});
		const northwestSquareX = screen.queryByRole("button", {
			name: /northwest square(.*)x/i,
		});
		expect(emptySquares.length).toBe(8);
		expect(northwestSquareX).not.toBeNull();
	});

	it("changes turns once an empty square is selected", () => {
		render(<Game />);
		act(() => {
			screen.getByRole("button", { name: /Northwest square/ }).click();
		});
		const turnIndicator = screen.getByText(/O's turn/i);
		expect(turnIndicator).not.toBeNull();
	});

	describe("Play Again button", () => {
		it("is hidden when game is in progress", () => {
			render(<Game />);
			const playAgainButton = screen.getByRole("button", {
				name: /play again/i,
			});
			expect(playAgainButton.parentElement).toHaveClass("invisible");
		});

		it("is visible when game ends in a win", () => {
			render(<Game />);
			act(() => {
				screen.getByRole("button", { name: /Northwest square/ }).click(); // X
				screen.getByRole("button", { name: /West square/ }).click(); // O
				screen.getByRole("button", { name: /North square/ }).click(); // X
				screen.getByRole("button", { name: /Center square/ }).click(); // O
				screen.getByRole("button", { name: /Northeast square/ }).click(); // X wins
			});
			const playAgainButton = screen.getByRole("button", {
				name: /play again/i,
			});
			expect(playAgainButton.parentElement).toHaveClass("visible");
		});

		it("is visible when game ends in a draw", () => {
			render(<Game />);
			act(() => {
				screen.getByRole("button", { name: /Northwest square/ }).click(); // X
			});
			act(() => {
				screen.getByRole("button", { name: /North square/ }).click(); // O
			});
			act(() => {
				screen.getByRole("button", { name: /West square/ }).click(); // X
			});
			act(() => {
				screen.getByRole("button", { name: /Center square/ }).click(); // O
			});
			act(() => {
				screen.getByRole("button", { name: /South square/ }).click(); // X
			});
			act(() => {
				screen.getByRole("button", { name: /Southwest square/ }).click(); // O
			});
			act(() => {
				screen.getByRole("button", { name: /Northeast square/ }).click(); // X
			});
			act(() => {
				screen.getByRole("button", { name: /East square/ }).click(); // O
			});
			act(() => {
				screen.getByRole("button", { name: /Southeast square/ }).click(); // draw
			});
			const playAgainButton = screen.getByRole("button", {
				name: /play again/i,
			});
			expect(playAgainButton.parentElement).toHaveClass("visible");
		});

		it("resets the board when clicked and gives the first turn to O when X started last round", () => {
			render(<Game />);
			act(() => {
				screen.getByRole("button", { name: /Northwest square/ }).click(); // X
				screen.getByRole("button", { name: /West square/ }).click(); // O
				screen.getByRole("button", { name: /North square/ }).click(); // X
				screen.getByRole("button", { name: /Center square/ }).click(); // O
				screen.getByRole("button", { name: /Northeast square/ }).click(); // X wins
				screen
					.getByRole("button", {
						name: /play again/i,
					})
					.click();
			});
			const emptySpaces = screen.getAllByRole("button", {
				name: /square(.*)empty/i,
			});
			expect(emptySpaces.length).toBe(9);
			expect(screen.getByText(/O's turn/i)).not.toBeNull();
		});

		it("resets the board when clicked and gives the first turn to X when O started last round", () => {
			render(<Game />);
			act(() => {
				screen.getByRole("button", { name: /Northwest square/ }).click(); // X
				screen.getByRole("button", { name: /West square/ }).click(); // O
				screen.getByRole("button", { name: /North square/ }).click(); // X
				screen.getByRole("button", { name: /Center square/ }).click(); // O
				screen.getByRole("button", { name: /Northeast square/ }).click(); // X wins
				screen
					.getByRole("button", {
						name: /play again/i,
					})
					.click();
			});
			act(() => {
				screen.getByRole("button", { name: /Northwest square/ }).click(); // X
				screen.getByRole("button", { name: /West square/ }).click(); // O
				screen.getByRole("button", { name: /North square/ }).click(); // X
				screen.getByRole("button", { name: /Center square/ }).click(); // O
				screen.getByRole("button", { name: /Northeast square/ }).click(); // X wins
				screen
					.getByRole("button", {
						name: /play again/i,
					})
					.click();
			});
			const emptySpaces = screen.getAllByRole("button", {
				name: /square(.*)empty/i,
			});
			expect(emptySpaces.length).toBe(9);
			expect(screen.getByText(/X's turn/i)).not.toBeNull();
		});
	});
});
