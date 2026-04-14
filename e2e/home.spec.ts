import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
  test("has title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Next-React-Project-Template/);
  });

  test("has correct heading", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("heading")).toBeVisible();
  });
});
