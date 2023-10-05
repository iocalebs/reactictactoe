import { render, screen } from "@testing-library/react";
import { Button } from ".";

const buttonIcon = <svg role="img"></svg>;
const buttonText = "I am a button";
const Children = () => <p>{buttonText}</p>;

describe("<Button />", () => {
	it("renders icon", () => {
		render(<Button icon={buttonIcon} />);
		expect(screen.queryByRole("img")).not.toBeNull();
	});

	it("renders children", () => {
		render(<Button icon={buttonIcon}>{<Children />}</Button>);
		expect(screen.queryByText(buttonText)).not.toBeNull();
	});

	it("calls onClick event handler when clicked", () => {
		const handeClick = jest.fn();
		render(<Button icon={buttonIcon} onClick={handeClick} />);
		screen.getByRole("button").click();
		expect(handeClick).toHaveBeenCalled();
	});
});
