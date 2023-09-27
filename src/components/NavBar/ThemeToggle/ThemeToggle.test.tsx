import { render, screen } from "@testing-library/react";
import { ThemeToggle } from ".";

describe("<ThemeToggle />", () => {
	test("light mode button enables light mode on click, then sets focus on dark mode button", () => {
		const mockSetTheme = jest.fn();
		window.__setTheme = mockSetTheme;
		render(<ThemeToggle />);

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

	test("dark mode button enables dark mode on click, then sets focus on light mode button", () => {
		render(<ThemeToggle />);
		const mockSetTheme = jest.fn();
		window.__setTheme = mockSetTheme;

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
