import { expect, test } from "@playwright/test";
test("protects the story and allows the local demo flow", async ({ page }) => {
  await page.goto("/story"); await expect(page).toHaveURL(/access/);
  await page.getByLabel("Passphrase").fill("demo"); const accessResponse = page.waitForResponse("**/api/access"); await page.getByRole("button", { name: /open my story/i }).click(); expect((await accessResponse).status()).toBe(200);
  await page.getByLabel(/dream destination/i).fill("Switzerland"); await page.getByRole("button", { name: /^continue/i }).click();
  await expect(page).toHaveURL(/story/); await expect(page.getByRole("heading", { name: /ready when you are/i })).toBeVisible();
});
test("does not disclose media to unauthenticated requests", async ({ request }) => { const response = await request.get("/api/media/demo-first"); expect(response.status()).toBe(404); });
