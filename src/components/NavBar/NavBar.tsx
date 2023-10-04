import { IconGitHub } from "@/components/Icon";
import { ColorModeToggle } from "./ColorModeToggle";
import { ColorModeScript } from "./ColorModeScript";

export function NavBar() {
	return (
		<>
			<ColorModeScript />
			<nav className="mb-4">
				<div className="flex justify-end gap-2 px-4 py-2">
					<ColorModeToggle />
					<a
						className="nav-button"
						aria-label="GitHub repository"
						href="https://github.com/castdin/reactic-tac-toe"
						target="_blank"
					>
						<IconGitHub />
					</a>
				</div>
			</nav>
		</>
	);
}
