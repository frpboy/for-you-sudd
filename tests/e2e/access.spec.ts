import { expect, test } from "@playwright/test";
async function enterStory(page: import("@playwright/test").Page) {
  await page.goto("/story");
  await expect(page).toHaveURL(/access/);
  await page.getByLabel("Passphrase").fill("demo");
  const accessResponse = page.waitForResponse("**/api/access");
  await page.getByRole("button", { name: /open my story/i }).click();
  expect((await accessResponse).status()).toBe(200);
  await page.getByLabel(/dream destination/i).fill("Switzerland");
  await page.getByRole("button", { name: /^continue/i }).click();
  await expect(page).toHaveURL(/story/);
  await expect(
    page.getByRole("heading", { name: /ready when you are/i }),
  ).toBeVisible();
}
test("protects the story and allows the private flow", async ({ page }) => {
  await enterStory(page);
});
test("does not disclose media to unauthenticated requests", async ({
  request,
}) => {
  const response = await request.get("/api/media/demo-first");
  expect(response.status()).toBe(404);
});
test("loads every private photo through the protected route", async ({
  page,
}) => {
  await enterStory(page);
  const imageIds = [
    "photo-first",
    "photo-sky",
    "photo-cafe",
    "photo-hands",
    "photo-car",
    "photo-rose",
    "photo-escalator",
    "photo-close",
    "photo-night",
    "photo-smile",
    "photo-mirror",
    "photo-city",
    "photo-flower",
    "photo-daylight",
    "photo-garden",
    "photo-green",
    "photo-peace",
    "photo-outdoor",
    "photo-tree",
    "photo-moon",
    "photo-glasses",
    "photo-filter",
    "photo-last",
    "note-universe",
    "note-heart",
    "note-only-you",
    "note-rare",
    "note-prettiest",
  ];
  const results = await page.evaluate(
    async (ids) =>
      Promise.all(
        ids.map(
          (id) =>
            new Promise<boolean>((resolve) => {
              const image = new Image();
              image.onload = () =>
                resolve(image.naturalWidth > 0 && image.naturalHeight > 0);
              image.onerror = () => resolve(false);
              image.src = `/api/media/${id}`;
            }),
        ),
      ),
    imageIds,
  );
  expect(results.every(Boolean)).toBe(true);
});
test("keeps the quiz on the current question until its date is correct", async ({
  page,
}) => {
  await enterStory(page);
  await page.evaluate(() =>
    localStorage.setItem("for-u-sudd-progress", "quiz"),
  );
  await page.reload();
  await expect(
    page.getByRole("heading", {
      name: /when did we become officially committed/i,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: /story navigation/i }),
  ).toHaveCount(0);
  await page.locator(".date-picker-trigger").click();
  await page
    .getByRole("button", { name: /^Select / })
    .first()
    .click();
  await page.getByRole("button", { name: /^continue/i }).click();
  await expect(
    page.getByText(/think of our december commitment/i),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: /when did we become officially committed/i,
    }),
  ).toBeVisible();
  await page.locator(".date-picker-trigger").click();
  await page.getByLabel("Select month").selectOption("11");
  await page.getByLabel("Select year").selectOption("2025");
  await page.getByLabel("Select day").selectOption("26");
  await page.getByRole("button", { name: /^continue/i }).click();
  await expect(
    page.getByRole("button", { name: /next question/i }),
  ).toBeVisible();
});
