import { act, renderHook } from "@testing-library/react";
import { usePrefersReducedMotion } from ".";

describe("usePrefersReducedMotion", () => {
	it("returns result of media query list matches", () => {
		window.matchMedia = jest.fn().mockImplementation((query) => ({
			matches: false,
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
		}));
		const { result } = renderHook(() => usePrefersReducedMotion());
		expect(result.current).toBe(false);
	});

	it("listens to changes in media query list", () => {
		let addedEventLister: (event: any) => void;
		window.matchMedia = jest.fn().mockImplementation((query) => ({
			matches: false,
			addEventListener: (type: string, eventListener: (event: any) => void) => {
				addedEventLister = eventListener;
			},
			removeEventListener: jest.fn(),
		}));

		const { result } = renderHook(() => usePrefersReducedMotion());

		expect(result.current).toBe(false);
		act(() => addedEventLister!({ matches: true }));
		expect(result.current).toBe(true);
	});
});
