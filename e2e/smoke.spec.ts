import { test, expect } from "@playwright/test";

test("root route renders without console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Pricing Calculator" })).toBeVisible();
  expect(errors).toEqual([]);
});

test("pricing calculator updates the estimate when the plan changes", async ({ page }) => {
  await page.goto("/");
  const total = page.getByText("Estimated total").locator("xpath=following-sibling::p[1]");

  await expect(total).toContainText("$195"); // Team, 10 seats, annual
  await page.getByRole("button", { name: "Business" }).click();
  await expect(total).toContainText("$424");
});
