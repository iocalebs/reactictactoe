import { render, screen } from "@testing-library/react";
import { TurnIndicator } from ".";

describe("<TurnIndicator />", () => {
	describe("visibility", () => {
		it("is invisible when whoseTurn is empty", () => {
			render(<TurnIndicator whoseTurn="" />);
			const turnIndicator = screen.getByText("Turn");
			expect(turnIndicator).toHaveClass("invisible");
		});

		it("is visible when whoseTurn is X", () => {
			render(<TurnIndicator whoseTurn="x" />);
			const turnIndicator = screen.getByText("Turn");
			expect(turnIndicator).toHaveClass("visible");
		});

		it("is visible when whoseTurn is O", () => {
			render(<TurnIndicator whoseTurn="o" />);
			const turnIndicator = screen.getByText("Turn");
			expect(turnIndicator).toHaveClass("visible");
		});
	});

	describe("accessibility", () => {
		it("announces that it's X's turn when whoseTurn is X", () => {
			render(<TurnIndicator whoseTurn="x" />);
			expect(screen.queryByText(/X's turn/i)).not.toBeNull();
			expect(screen.queryByText(/O's turn/i)).toBeNull();
		});

		it("announces that it's O's turn when whoseTurn is O", () => {
			render(<TurnIndicator whoseTurn="o" />);
			expect(screen.queryByText(/O's turn/i)).not.toBeNull();
			expect(screen.queryByText(/X's turn/i)).toBeNull();
		});

		it("announces nothing when whoseTurn is empty", () => {
			render(<TurnIndicator whoseTurn="" />);
			const turnIndicator = screen.queryByLabelText(/turn/i);
			expect(turnIndicator).toBeNull();
		});
	});
});
