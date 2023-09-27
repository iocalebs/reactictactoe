import { ThemeToggle } from "./ThemeToggle";

export function TopBar() {
	return (
		<nav>
			<div className="p-3">
				<ThemeToggle />
			</div>
		</nav>
	);
}
