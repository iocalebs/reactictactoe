import { IconGitHub } from "@/components/Icon";
import { ThemeToggle } from "./ThemeToggle";

export function NavBar() {
	return (
		<nav className="flex justify-end gap-2 px-4 py-2">
			<ThemeToggle />
			<a
				className="nav-button"
				href="https://github.com/castdin/reactic-tac-toe"
				target="_blank"
			>
				<IconGitHub />
			</a>
		</nav>
	);
}
