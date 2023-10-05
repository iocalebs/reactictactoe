import { useEffect, useState } from "react";

export function usePrefersReducedMotion() {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-reduced-motion)");
		setPrefersReducedMotion(mediaQuery.matches);

		const onPreferenceChange = (mediaQueryList: MediaQueryListEvent) => {
			setPrefersReducedMotion(mediaQueryList.matches);
		};
		mediaQuery.addEventListener("change", onPreferenceChange);
		return () => {
			mediaQuery.removeEventListener("change", onPreferenceChange);
		};
	}, []);

	return prefersReducedMotion;
}
