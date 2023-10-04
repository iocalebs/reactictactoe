"use client";

import { IconMoon, IconSun } from "@/components/Icon";
import { useRef } from "react";

export function ColorModeToggle() {
	const sunRef = useRef<HTMLButtonElement>(null);
	const moonRef = useRef<HTMLButtonElement>(null);

	return (
		<>
			<button
				ref={sunRef}
				aria-label="Switch to Light Mode"
				className="nav-button hidden dark:flex"
				onClick={() => {
					window.__setColorMode("light");
					moonRef?.current?.focus();
				}}
			>
				<IconSun />
			</button>
			<button
				ref={moonRef}
				aria-label="Switch to Dark Mode"
				className="nav-button dark:hidden"
				onClick={() => {
					window.__setColorMode("dark");
					sunRef?.current?.focus();
				}}
			>
				<IconMoon />
			</button>
		</>
	);
}
