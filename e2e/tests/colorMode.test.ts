import { test, expect } from "@playwright/test";

test("light mode appearance", async ({ page }) => {
	await page.emulateMedia({ colorScheme: "light" });
	await page.goto("/");
	await page.getByRole("button", { name: /northwest square/i }).click();
	await page.getByRole("button", { name: /north square/i }).click();
	await expect(page).toHaveScreenshot("light-mode.png");
});

test("dark mode appearance", async ({ page }) => {
	await page.emulateMedia({ colorScheme: "dark" });
	await page.goto("/");
	await page.getByRole("button", { name: /southeast square/i }).click();
	await page.getByRole("button", { name: /center square/i }).click();
	await expect(page).toHaveScreenshot("dark-mode.png");
});

test("defaults to light mode if system preference set to light mode", async ({
	page,
}) => {
	await page.emulateMedia({ colorScheme: "light" });
	await page.goto("/");
	await expect(page.locator("html")).not.toHaveClass("dark");
});

test("defaults to dark mode if system preference set to dark mode", async ({
	page,
}) => {
	await page.emulateMedia({ colorScheme: "dark" });
	await page.goto("/");
	await expect(page.locator("html")).toHaveClass("dark");
});

test("changes modes when system preference changes", async ({ page }) => {
	await page.emulateMedia({ colorScheme: "light" });
	await page.goto("/");

	await expect(page.locator("html")).not.toHaveClass("dark");
	await page.emulateMedia({ colorScheme: "dark" });
	await expect(page.locator("html")).toHaveClass("dark");
	await page.emulateMedia({ colorScheme: "light" });
	await expect(page.locator("html")).not.toHaveClass("dark");
});

test("changes from light to dark mode when dark mode toggle clicked", async ({
	page,
}) => {
	await page.emulateMedia({ colorScheme: "light" });
	await page.goto("/");
	await page.getByRole("button", { name: /dark mode/i }).click();
	await expect(page.locator("html")).toHaveClass("dark");
});

test("changes from dark to light mode when light mode toggle clicked", async ({
	page,
}) => {
	await page.emulateMedia({ colorScheme: "dark" });
	await page.goto("/");
	await page.getByRole("button", { name: /light mode/i }).click();
	await expect(page.locator("html")).not.toHaveClass("dark");
});

test("color mode selection retained on page reload", async ({ page }) => {
	await page.emulateMedia({ colorScheme: "light" });
	await page.goto("/");
	await page.getByRole("button", { name: /dark mode/i }).click();
	await page.reload();
	await expect(page.locator("html")).toHaveClass("dark");
});

test("change in system preference overrides color mode selected in app", async ({
	page,
}) => {
	await page.emulateMedia({ colorScheme: "light" });
	await page.goto("/");
	await page.getByRole("button", { name: /dark mode/i }).click();
	await page.emulateMedia({ colorScheme: "dark" });
	await page.waitForTimeout(100); // it appears an event isn't fired if colorScheme is changed too quickly
	await page.emulateMedia({ colorScheme: "light" });
	await expect(page.locator("html")).not.toHaveClass("dark");
});
