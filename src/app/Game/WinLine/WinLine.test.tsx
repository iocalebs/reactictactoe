import { render, screen } from "@testing-library/react";
import { WinLine } from ".";
import React from "react";

describe("<WinLine />", () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("fades in instead of growing if reduceMotion is true", () => {
		render(
			<WinLine
				reduceMotion
				winState="CenterVertical"
				onAnimationComplete={() => {}}
			/>,
		);
		expect(screen.getByTestId("winline-inner")).toHaveClass("animate-fade-in");
	});
});
