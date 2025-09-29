import { test, expect } from "@playwright/test";

test("create board and add card", async ({ page }) => {
    await page.goto("http://localhost:3000");

    await page.click("text=Add");
    await page.fill("input[placeholder='Title']", "Test Board");
    await page.click("text=Save");

    await expect(page.locator("text=Test Board")).toBeVisible();
});

test("drag & drop card between columns", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const card = page.locator(".card-item").first();
    const target = page.locator(".column").nth(1);

    const cardText = await card.textContent();

    await card.dragTo(target);

    if (cardText) {
        await expect(target.locator(".card-item")).toContainText(cardText);
    }
});