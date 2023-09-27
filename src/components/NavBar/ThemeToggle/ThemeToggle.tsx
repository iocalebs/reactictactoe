"use client";

import { IconMoon, IconSun } from "@/components/Icon";
import { useRef } from "react";

declare global {
	interface Window {
		__setTheme: (theme: "light" | "dark") => void; // See src/app/layout.tsx
	}
}

export function ThemeToggle() {
	const sunRef = useRef<HTMLButtonElement>(0);
	const moonRef = useRef<HTMLButtonElement>(0);

	return (
		<>
			<button
				ref={sunRef}
				className="nav-button hidden dark:flex"
				onClick={() => {
					window.__setTheme("light");
					moonRef.current.focus();
				}}
			>
				<IconSun />
			</button>
			<button
				ref={moonRef}
				className="nav-button dark:hidden"
				onClick={() => {
					window.__setTheme("dark");
					sunRef.current.focus();
				}}
			>
				<IconMoon />
			</button>
		</>
	);
}
