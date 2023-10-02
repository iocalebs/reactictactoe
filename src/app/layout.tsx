import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { NavBar } from "@/components/NavBar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Tic Tac Toe",
	description: "A project by @castdin",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	/**
	 * Adapted from react.dev and tailwindcss.com solutions, with one key
	 * difference: Changes to the system theme are respected even if the change
	 * occurs after the media query listener disappears, i.e. the browser is no longer running.
	 * This is worth supporting in the event that:
	 * A) the user has the theme change with the time of day
	 * B) the user frequently quits apps they're not using
	 */
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
							(function () {
								function setTheme(theme) {
									if (theme == "dark") {
										document.documentElement.classList.add("dark");
									} else {
										document.documentElement.classList.remove("dark");
									}
								}
								function setAppTheme(theme) {
									setTheme(theme);
									try {
										localStorage.setItem("appTheme", theme);
									} catch (err) {}
								}
								function setSystemTheme(theme) {
									setAppTheme(theme);
									try {
										localStorage.setItem("lastSystemTheme", systemTheme);
									} catch (err) {}
								}

								window.__setTheme = setAppTheme

								var appTheme;
								var lastSystemTheme;
								try {
									appTheme = localStorage.getItem("appTheme");
									lastSystemTheme = localStorage.getItem("lastSystemTheme");
								} catch (err) {}

								var darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
								var systemTheme = darkQuery.matches ? "dark" : "light";

								if (!appTheme || (lastSystemTheme && lastSystemTheme !== systemTheme)) {
									setSystemTheme(systemTheme);
								} else {
									setAppTheme(appTheme);
								}

								darkQuery.addEventListener("change", function (e) {
									setSystemTheme(e.matches ? "dark" : "light");
								});
							})();
						`,
					}}
				></script>
			</head>
			<body
				className={
					inter.className +
					" flex flex-col bg-neutral-200 text-neutral-900 transition-colors dark:bg-neutral-900 dark:text-neutral-200"
				}
			>
				<nav className="mb-4">
					<NavBar />
				</nav>
				<main className="mx-8">{children}</main>
			</body>
		</html>
	);
}
