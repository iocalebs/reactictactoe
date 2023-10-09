import { render, screen, act, fireEvent } from "@testing-library/react";
import { SquarePosition } from "@/types";
import { Game } from ".";

function makeMove(squarePosition: SquarePosition) {
	act(() => {
		screen
			.getByRole("button", { name: new RegExp(squarePosition + " ") })
			.click();
	});
}

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

		makeMove("Northwest");

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

		makeMove("Northeast");

		const turnIndicator = screen.getByText(/O's turn/i);
		expect(turnIndicator).not.toBeNull();
	});

	it("does not change the turn if the selected square has already been chosen", () => {
		render(<Game />);

		makeMove("Northeast");
		makeMove("Northeast");

		const turnIndicator = screen.getByText(/O's turn/i);
		expect(turnIndicator).not.toBeNull();
	});

	it("announces the winning line when the game is won", () => {
		render(<Game />);

		makeMove("Northwest");
		makeMove("Southwest");
		makeMove("Center");
		makeMove("West");
		makeMove("Southeast");

		const winningLine = screen.getByText(
			"Winning line: Top left to bottom right diagonal",
		);
		expect(winningLine).not.toBeNull();
	});

	it("announces X as the winner when the game is won by X", () => {
		render(<Game />);

		makeMove("Southwest");
		makeMove("West");
		makeMove("South");
		makeMove("Center");
		makeMove("Southeast");

		expect(screen.getByText(/x wins/i)).not.toBeNull();
	});

	it("announces O as the winner when the game is won by O", () => {
		render(<Game />);

		makeMove("East");
		makeMove("Northwest");
		makeMove("West");
		makeMove("North");
		makeMove("Southeast");
		makeMove("Northeast");

		expect(screen.getByText(/o wins/i)).not.toBeNull();
	});

	it("announces a draw when the game ends in a tie", () => {
		render(<Game />);

		makeMove("Southwest");
		makeMove("Center");
		makeMove("Northwest");
		makeMove("West");
		makeMove("East");
		makeMove("North");
		makeMove("South");
		makeMove("Southeast");
		makeMove("Northeast");

		expect(screen.getByText(/draw/i)).not.toBeNull();
	});

	it("allows no further moves when the game is won", () => {
		render(<Game />);

		makeMove("West");
		makeMove("North");
		makeMove("Southwest");
		makeMove("Center");
		makeMove("Southeast");
		makeMove("South"); // O wins
		makeMove("Northwest"); // X attempts winning move after game over

		const emptySquares = screen.queryAllByRole("button", { name: /empty/i });
		const northwestSquare = screen.getByRole("button", { name: /Northwest/i });
		expect(emptySquares.length).toBe(3);
		expect(northwestSquare).toHaveAccessibleName(/empty/i);
	});

	describe("Play Again button", () => {
		it("is hidden when game is in progress", () => {
			render(<Game />);

			const playAgainButton = screen.getByRole("button", {
				name: /play again/i,
			});

			expect(playAgainButton.parentElement).toHaveClass("invisible");
		});

		it("is visible when game ends in a win after the win animation completes", () => {
			render(<Game />);

			makeMove("Northwest");
			makeMove("West");
			makeMove("North");
			makeMove("Center");
			makeMove("Northeast");
			const winLine = screen.getByTestId("win-line");
			act(() => {
				fireEvent.animationEnd(winLine);
			});
			const playAgainButton = screen.getByRole("button", {
				name: /play again/i,
			});
			expect(playAgainButton.parentElement).toHaveClass("visible");
		});

		it("is visible when game ends in a draw", () => {
			render(<Game />);

			makeMove("Northwest");
			makeMove("North");
			makeMove("West");
			makeMove("Center");
			makeMove("South");
			makeMove("Southwest");
			makeMove("Northeast");
			makeMove("East");
			makeMove("Southeast");

			const playAgainButton = screen.getByRole("button", {
				name: /play again/i,
			});
			expect(playAgainButton.parentElement).toHaveClass("visible");
		});

		it("resets the board when clicked and gives the first turn to O when X started last round", () => {
			render(<Game />);

			makeMove("Northwest");
			makeMove("West");
			makeMove("North");
			makeMove("Center");
			makeMove("Northeast");
			act(() => {
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

			makeMove("Northwest");
			makeMove("West");
			makeMove("North");
			makeMove("Center");
			makeMove("Northeast");
			act(() => {
				screen
					.getByRole("button", {
						name: /play again/i,
					})
					.click();
			});
			makeMove("Northwest");
			makeMove("West");
			makeMove("North");
			makeMove("Center");
			makeMove("Northeast");
			act(() => {
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
