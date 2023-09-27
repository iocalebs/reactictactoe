"use client";

import { IconMoon, IconSun } from "@/components/Icon";

declare global {
	interface Window {
		__setTheme: (theme: "light" | "dark") => void; // See src/app/layout.tsx
	}
}

export function ThemeToggle() {
	return (
		<div className="mx-2 flex justify-end">
			<button className="dark:hidden" onClick={() => window.__setTheme("dark")}>
				<IconMoon />
			</button>
			<button
				className="hidden dark:inline-block"
				onClick={() => window.__setTheme("light")}
			>
				<IconSun />
			</button>
		</div>
	);
}
