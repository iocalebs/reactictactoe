import { render, screen } from "@testing-library/react";
import { ColorModeToggle } from ".";

describe("<ColorModeToggle />", () => {
	it("enables light mode on light mode button click, then sets focus on dark mode button", () => {
		const mockSetTheme = jest.fn();
		window.__setColorMode = mockSetTheme;
		render(<ColorModeToggle />);

		const lightModeButton = screen.getByRole("button", {
			name: /light/i,
		});
		const darkModeButton = screen.getByRole("button", {
			name: /dark/i,
		});
		lightModeButton.click();

		expect(mockSetTheme).toHaveBeenCalledWith("light");
		expect(darkModeButton).toHaveFocus();
	});

	it("enables dark mode on dark mode button click, then sets focus on light mode button", () => {
		render(<ColorModeToggle />);
		const mockSetTheme = jest.fn();
		window.__setColorMode = mockSetTheme;

		const lightModeButton = screen.getByRole("button", {
			name: /light/i,
		});
		const darkModeButton = screen.getByRole("button", {
			name: /dark/i,
		});
		darkModeButton.click();

		expect(mockSetTheme).toHaveBeenCalledWith("dark");
		expect(lightModeButton).toHaveFocus();
	});
});
