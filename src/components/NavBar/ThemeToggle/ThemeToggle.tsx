"use client";

import { IconMoon, IconSun } from "@/components/Icon";

declare global {
	interface Window {
		__setTheme: (theme: "light" | "dark") => void; // See src/app/layout.tsx
	}
}

export function ThemeToggle() {
	return (
		<>
			<button
				className="nav-button dark:hidden"
				onClick={() => window.__setTheme("dark")}
			>
				<IconMoon />
			</button>
			<button
				className="nav-button hidden dark:flex"
				onClick={() => window.__setTheme("light")}
			>
				<IconSun />
			</button>
		</>
	);
}
