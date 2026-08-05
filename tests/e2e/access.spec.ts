import { expect, test } from "@playwright/test";
async function enterStory(page: import("@playwright/test").Page) {
  await page.goto("/story");
  await expect(page).toHaveURL(/access/);
  await page.getByLabel("Passphrase").fill("demo");
  const accessResponse = page.waitForResponse("**/api/access");
  await page.getByRole("button", { name: /open the next memory/i }).click();
  expect((await accessResponse).status()).toBe(200);
  await expect(page).toHaveURL(/story/);
  await expect(page.getByRole("heading", { name: /your special day/i })).toBeVisible();
}
async function answerDate(
  page: import("@playwright/test").Page,
  month: string,
  year: string,
  date: string,
) {
  await page.locator(".date-picker-trigger").click();
  await page.getByRole("button", { name: "Choose month" }).click();
  await page.getByRole("button", { name: month, exact: true }).click();
  await page.getByRole("button", { name: "Choose year" }).click();
  await page.getByRole("button", { name: year, exact: true }).click();
  await page.getByRole("button", { name: `Select ${date}` }).click();
  await page.getByRole("button", { name: /reveal this memory/i }).click();
  await page.waitForTimeout(950);
}
test("protects the story and allows the private flow", async ({ page }) => {
  await enterStory(page);
});
test("starts at the opening after access even with stale story progress", async ({ page }) => {
  await page.goto("/access");
  await page.evaluate(() => localStorage.setItem("for-u-sudd-progress", "quiz"));
  await enterStory(page);
});
test("navigates stories with edge taps and horizontal swipes", async ({ page }) => {
  await enterStory(page);
  await page.evaluate(() => localStorage.setItem("for-u-sudd-progress", "welcome"));
  await page.reload();
  await expect(page.getByRole("heading", { name: /happy birthday/i })).toBeVisible();
  await page.mouse.click(24, 420);
  await expect(page.getByRole("heading", { name: /your special day/i })).toBeVisible();
  await page.mouse.click(360, 420);
  await expect(page.getByRole("heading", { name: /happy birthday/i })).toBeVisible();
  await page.mouse.move(24, 420);
  await page.mouse.down();
  await page.mouse.move(170, 420, { steps: 4 });
  await page.mouse.up();
  await expect(page.getByRole("heading", { name: /your special day/i })).toBeVisible();
});
test("navigates with native touch events", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-mobile", "TouchEvent construction is Chromium coverage.");
  await enterStory(page);
  await page.evaluate(() => localStorage.setItem("for-u-sudd-progress", "welcome"));
  await page.reload();
  await page.locator("main.story-shell").evaluate((target) => {
    const touch = (x: number) => new Touch({ identifier: 1, target, clientX: x, clientY: 420 });
    target.dispatchEvent(new TouchEvent("touchstart", { bubbles: true, touches: [touch(340)] }));
    target.dispatchEvent(new TouchEvent("touchend", { bubbles: true, changedTouches: [touch(80)] }));
  });
  await expect(page.getByRole("heading", { name: /it all started/i })).toBeVisible();
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
    "station-krishnarajapuram",
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
    "note-choose-you",
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
  await page.getByRole("button", { name: /reveal this memory/i }).click();
  await expect(
    page.getByText(/think of our december commitment/i),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: /when did we become officially committed/i,
    }),
  ).toBeVisible();
  await page.locator(".date-picker-trigger").click();
  await page.getByRole("button", { name: "Choose month" }).click();
  await page.getByRole("button", { name: "December", exact: true }).click();
  await page.getByRole("button", { name: "Choose year" }).click();
  await page.getByRole("button", { name: "2025", exact: true }).click();
  await page.getByRole("button", { name: "Select 26 December 2025" }).click();
  await page.getByRole("button", { name: /reveal this memory/i }).click();
  await expect(
    page.getByText(/memory unlocked/i),
  ).toBeVisible();
});
test("shows and selects the favourite-moment radio option", async ({ page }) => {
  test.setTimeout(45_000);
  await enterStory(page);
  await page.evaluate(() => localStorage.setItem("for-u-sudd-progress", "quiz"));
  await page.reload();
  await answerDate(page, "December", "2025", "26 December 2025");
  await answerDate(page, "January", "2026", "6 January 2026");
  await page.getByLabel("Your answer").fill("Switzerland");
  await page.getByRole("button", { name: /reveal this memory/i }).click();
  await page.waitForTimeout(950);
  await answerDate(page, "December", "2025", "19 December 2025");
  const choice = page.getByRole("radio", {
    name: "Spending time together after fights",
  });
  await choice.click();
  await expect(choice).toBeChecked();
});
