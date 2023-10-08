import { render, screen } from "@testing-library/react";
import { WinLine } from ".";
import React from "react";

describe("<WinLine />", () => {
	describe("accessibility - announces the winning line", () => {
		test("center vertical", () => {
			render(<WinLine winType="CenterVertical" onAnimationEnd={() => {}} />);
			expect(
				screen.queryByText(/Winning line: center vertical/i),
			).not.toBeNull();
		});

		test("left vertical", () => {
			render(<WinLine winType="Left" onAnimationEnd={() => {}} />);
			expect(screen.queryByText(/Winning line: left vertical/i)).not.toBeNull();
		});

		test("right vertical", () => {
			render(<WinLine winType="Right" onAnimationEnd={() => {}} />);
			expect(
				screen.queryByText(/Winning line: right vertical/i),
			).not.toBeNull();
		});

		test("center horizontal", () => {
			render(<WinLine winType="CenterHorizontal" onAnimationEnd={() => {}} />);
			expect(
				screen.queryByText(/Winning line: center horizontal/i),
			).not.toBeNull();
		});

		test("top horizontal", () => {
			render(<WinLine winType="Top" onAnimationEnd={() => {}} />);
			expect(
				screen.queryByText(/Winning line: top horizontal/i),
			).not.toBeNull();
		});

		test("bottom horizontal", () => {
			render(<WinLine winType="Bottom" onAnimationEnd={() => {}} />);
			expect(
				screen.queryByText(/Winning line: bottom horizontal/i),
			).not.toBeNull();
		});

		test("top right diagonal", () => {
			render(
				<WinLine winType="TopRightBottomLeft" onAnimationEnd={() => {}} />,
			);
			expect(
				screen.queryByText(/Winning line: top right to bottom left diagonal/i),
			).not.toBeNull();
		});

		test("top left diagonal", () => {
			render(
				<WinLine winType="TopLeftBottomRight" onAnimationEnd={() => {}} />,
			);
			expect(
				screen.queryByText(/Winning line: top left to bottom right diagonal/i),
			).not.toBeNull();
		});
	});
});
