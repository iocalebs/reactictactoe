import { render, screen } from "@testing-library/react";
import { NavBar } from ".";

describe("<Navbar />", () => {
	test("links to GitHub repository", () => {
		render(<NavBar />);

		const link = screen.getByRole("link", { name: /GitHub/i });

		expect(link).toHaveAttribute(
			"href",
			"https://github.com/castdin/reactic-tac-toe",
		);
	});
});
