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
					function setAppColorMode(colorMode) {
						setColorMode(colorMode);
						try {
							localStorage.setItem("appColorMode", colorMode);
						} catch (err) {}
					}
					function setSystemColorMode(colorMode) {
						setAppColorMode(colorMode);
						try {
							localStorage.setItem("lastSystemColorMode", systemColorMode);
						} catch (err) {}
					}

					window.__setColorMode = setAppColorMode

					var appColorMode;
					var lastSystemColorMode;
					try {
						appColorMode = localStorage.getItem("appColorMode");
						lastSystemColorMode = localStorage.getItem("lastSystemColorMode");
					} catch (err) {}

					var darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
					var systemColorMode = darkQuery.matches ? "dark" : "light";

					if (!appColorMode || (lastSystemColorMode && lastSystemColorMode !== systemColorMode)) {
						setSystemColorMode(systemColorMode);
					} else {
						setAppColorMode(appColorMode);
					}

					darkQuery.addEventListener("change", function (e) {
						setSystemColorMode(e.matches ? "dark" : "light");
					});
				})();
			`,
			}}
		></script>
	);
}
