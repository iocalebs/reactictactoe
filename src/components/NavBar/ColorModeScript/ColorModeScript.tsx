declare global {
	interface Window {
		__setColorMode: (colorMode: "light" | "dark") => void;
	}
}

/**
 * Adapted from react.dev and tailwindcss.com solutions, with one key
 * difference: Changes to the system theme are respected even if the change
 * occurs after the media query listener disappears, i.e. the browser is no longer running.
 * This is worth supporting in the event that:
 * A) the user has the theme change with the time of day
 * B) the user frequently quits apps they're not using
 */
export function ColorModeScript() {
	return (
		<script
			dangerouslySetInnerHTML={{
				__html: `
				(function () {
					function setColorMode(colorMode) {
						if (colorMode == "dark") {
							document.documentElement.classList.add("dark");
						} else {
							document.documentElement.classList.remove("dark");
						}
					}

					var appColorMode;
					var lastSystemColorMode;

					function updateAppColorMode(colorMode) {
						appColorMode = colorMode;
						setColorMode(colorMode);
						try {
							localStorage.setItem("appColorMode", colorMode);
						} catch (err) {}
					}
					function updateSystemColorMode(colorMode) {
						lastSystemColorMode = colorMode
						updateAppColorMode(colorMode);
						try {
							localStorage.setItem("lastSystemColorMode", systemColorMode);
						} catch (err) {}
					}

					window.__setColorMode = updateAppColorMode

					try {
						appColorMode = localStorage.getItem("appColorMode");
						lastSystemColorMode = localStorage.getItem("lastSystemColorMode");
					} catch (err) {}

					var darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
					var systemColorMode = darkQuery.matches ? "dark" : "light";

					if (!appColorMode || (lastSystemColorMode && lastSystemColorMode !== systemColorMode)) {
						updateSystemColorMode(systemColorMode);
					} else {
						updateAppColorMode(appColorMode);
					}

					var afterPrint = false;
					darkQuery.addEventListener("change", function (e) {
						var printing = window.matchMedia("print").matches;
						if (afterPrint || printing) {
							afterPrint = printing;
							return;
						}
						updateSystemColorMode(e.matches ? "dark" : "light");
					});

					var appColorModeBeforePrint;
					window.addEventListener("beforeprint", function (e) {
						setColorMode("light");
						appColorModeBeforePrint = appColorMode
					});
					window.addEventListener("afterprint", function (e) {
						if (appColorModeBeforePrint === "dark") {
							setColorMode("dark");
						}
					});
				})();
			`,
			}}
		></script>
	);
}
