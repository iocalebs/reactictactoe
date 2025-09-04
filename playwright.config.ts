import { defineConfig, devices } from "@playwright/test";

const LOCAL_BASE_URL = "http://localhost:3000";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: "./e2e",
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: "html",

	timeout: process.env.CI ? 30 * 1000 : 10 * 1000,

	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: process.env.BASE_URL || LOCAL_BASE_URL,

		contextOptions: {
			reducedMotion: process.env.WITH_MOTION ? "no-preference" : "reduce",
		},

		launchOptions: {
			slowMo: process.env.SLOWMO ? 500 : undefined,
		},

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "on-first-retry",
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
			expect: {
				/**
				 * Workaround for Chromium screenshots being different by a few pixels in CI vs. local
				 * Likely relates to tohttps://github.com/microsoft/playwright/issues/18827
				 */
				toHaveScreenshot: { maxDiffPixelRatio: 0.01 },
			},
		},

		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
		},

		{
			name: "webkit",
			use: { ...devices["Desktop Safari"] },
		},

		/* Test against mobile viewports. */
		// {
		//   name: 'Mobile Chrome',
		//   use: { ...devices['Pixel 5'] },
		// },
		// {
		//   name: 'Mobile Safari',
		//   use: { ...devices['iPhone 12'] },
		// },

		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: { ...devices['Desktop Edge'], channel: 'msedge' },
		// },
		// {
		//   name: 'Google Chrome',
		//   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
		// },
	],

	/* Run your local dev server before starting the tests */
	webServer: {
		command: "pnpm dev",
		url: process.env.BASE_URL || LOCAL_BASE_URL,
		reuseExistingServer: true,
	},
});
