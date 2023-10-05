import { render, fireEvent, screen } from "@testing-library/react";
import { Square } from ".";

describe("<Square />", () => {
	it("shows a shadow of an X when hovering over an empty square", () => {
		render(
			<Square
				positionX="left"
				positionY="top"
				whoseTurn="x"
				value=""
				onChoice={() => {}}
			/>,
		);
		fireEvent.mouseOver(screen.getByRole("button"));
		expect(screen.getByRole("button")).toHaveClass("opacity-10");
		fireEvent.mouseOut(screen.getByRole("button"));
		expect(screen.getByRole("button")).not.toHaveClass("opacity-10");
	});
	it("shows a shadow of an O when hovering over an empty square", () => {
		render(
			<Square
				positionX="left"
				positionY="top"
				whoseTurn="o"
				value=""
				onChoice={() => {}}
			/>,
		);
		fireEvent.mouseOver(screen.getByRole("button"));
		expect(screen.getByRole("button")).toHaveClass("opacity-10");
		fireEvent.mouseOut(screen.getByRole("button"));
		expect(screen.getByRole("button")).not.toHaveClass("opacity-10");
	});
});
