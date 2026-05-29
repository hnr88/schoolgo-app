/**
 * E2E tests: saved schools (bookmarks) and saved searches flows.
 *
 * B14/D11 — SAVED SCHOOLS:
 *   1. Navigate to /en/parent/search?preview=spec — bookmark the first school card.
 *   2. Assert POST /api/bookmarks returns 2xx.
 *   3. Navigate to /en/parent/saved-schools — the bookmarked school appears.
 *   4. Delete the bookmark (Remove button) — assert gone + DELETE 2xx.
 *   5. Leave the list empty.
 *
 * B13/D12 — SAVED SEARCHES:
 *   1. Navigate to /en/parent/search?preview=spec.
 *   2. Click the "Victoria (VIC)" state button in the SpecFilterSidebar to set a filter.
 *   3. Open the "Save search" dialog, name it, save.
 *   4. Assert POST /api/saved-searches returns 2xx.
 *   5. Navigate to /en/parent/saved-searches — saved search appears.
 *   6. Click "Run search" — assert navigation to /parent/search and VIC filter applied.
 *   7. Return to saved-searches, delete it — assert gone + DELETE 2xx.
 *   8. Leave the list empty.
 *
 * Layout note: the SpecFilterSidebar (SaveSearchButton) and SpecResultsPanel
 * (school cards with CardActions bookmark buttons) only render when the URL
 * contains `?preview=spec`. Without that param, only FilterSidebar + SearchBar +
 * SchoolResultsPanel (no bookmark buttons, no save-search button) are visible.
 *
 * Auth: storageState from auth.setup.ts (parent@schoolgo.test already logged in).
 * Image-400 noise is explicitly allowlisted; no other console errors are tolerated.
 */
import { test, expect } from '@playwright/test';
import type { Page, Response } from '@playwright/test';
import {
  attachConsoleErrorWatcher,
  assertNoConsoleErrors,
} from './_helpers';

/** Silence ONLY the known dev-only next/image 400 noise. Nothing else. */
const IMAGE_400_ALLOWLIST = ['Failed to load resource', '_next/image'];

/** Collect all responses matching a method + URL pattern. */
function collectResponses(
  page: Page,
  method: string,
  pattern: RegExp,
): Response[] {
  const collected: Response[] = [];
  page.on('response', (res) => {
    if (res.request().method() === method && pattern.test(res.url())) {
      collected.push(res);
    }
  });
  return collected;
}

/**
 * The search page with spec-mode features (SpecFilterSidebar + SpecResultsPanel)
 * requires `?preview=spec` in the URL. This activates:
 *   - SpecFilterSidebar (contains SaveSearchButton + LocationFilterGroup with state chips)
 *   - SpecResultsPanel (contains school tile cards with CardActions bookmark buttons)
 */
const SEARCH_URL = '/en/parent/search?preview=spec';

/** Wait for the spec search page to hydrate: SpecFilterSidebar must be mounted. */
async function waitForSearchReady(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
  // SpecFilterSidebar renders only when ?preview=spec. The "Save search" button
  // is the clearest signal that it is fully mounted.
  await expect(
    page.getByRole('button', { name: /save search/i }),
  ).toBeVisible({ timeout: 20_000 });
}

// ---------------------------------------------------------------------------
// SAVED SCHOOLS (B14 / D11)
// ---------------------------------------------------------------------------

test.describe('saved schools (B14/D11)', () => {
  test('bookmark a school, verify it lists, then delete it', async ({ page }) => {
    attachConsoleErrorWatcher(page, IMAGE_400_ALLOWLIST);

    // Track POST to /api/bookmarks (create) and DELETE to /api/bookmarks/:id (remove).
    const postResponses = collectResponses(page, 'POST', /\/api\/bookmarks$/);
    const deleteResponses = collectResponses(page, 'DELETE', /\/api\/bookmarks\//);

    // -----------------------------------------------------------------------
    // Step 1: Navigate to spec-preview search and bookmark the first school card.
    // -----------------------------------------------------------------------
    await page.goto(SEARCH_URL);
    await waitForSearchReady(page);

    // SpecResultsPanel renders SpecSchoolCard tiles, each with a CardActions bookmark
    // button. aria-label="Add {name} to bookmarks" when not yet bookmarked.
    const bookmarkBtn = page
      .getByRole('button', { name: /add .+ to bookmarks/i })
      .first();

    await expect(bookmarkBtn).toBeVisible({ timeout: 20_000 });

    // Extract the school name from aria-label for later assertion.
    const bookmarkLabel = (await bookmarkBtn.getAttribute('aria-label')) ?? '';
    const schoolNameMatch = bookmarkLabel.match(/^Add (.+) to bookmarks$/i);
    const schoolName = schoolNameMatch?.[1] ?? '';
    console.info(`[saved-schools] Bookmarking school: "${schoolName}"`);

    await bookmarkBtn.click();

    // -----------------------------------------------------------------------
    // Step 2: Assert POST /api/bookmarks returned 2xx.
    // -----------------------------------------------------------------------
    await expect(async () => {
      expect(postResponses.length).toBeGreaterThanOrEqual(1);
    }).toPass({ timeout: 10_000 });

    const createStatus = postResponses[0].status();
    console.info(`[saved-schools] POST /api/bookmarks → ${createStatus}`);
    expect(createStatus).toBeGreaterThanOrEqual(200);
    expect(createStatus).toBeLessThan(300);

    // -----------------------------------------------------------------------
    // Step 3: Navigate to saved-schools — bookmarked school must appear.
    // -----------------------------------------------------------------------
    await page.goto('/en/parent/saved-schools');
    await page.waitForLoadState('networkidle');

    await expect(
      page.getByRole('heading', { name: /saved schools/i }),
    ).toBeVisible({ timeout: 15_000 });

    if (schoolName) {
      await expect(page.getByText(schoolName, { exact: false })).toBeVisible({
        timeout: 15_000,
      });
    } else {
      // Fallback: no empty-state text should be visible.
      await expect(page.getByText(/no saved schools yet/i)).not.toBeVisible({
        timeout: 15_000,
      });
    }

    // -----------------------------------------------------------------------
    // Step 4: Delete the bookmark via the "Remove" button.
    // -----------------------------------------------------------------------
    // SavedSchoolsPage renders a "Remove" button (Heart icon) below each card.
    const removeBtn = page.getByRole('button', { name: /remove/i }).first();
    await expect(removeBtn).toBeVisible({ timeout: 10_000 });
    await removeBtn.click();

    // Assert DELETE returned 2xx.
    await expect(async () => {
      expect(deleteResponses.length).toBeGreaterThanOrEqual(1);
    }).toPass({ timeout: 10_000 });

    const deleteStatus = deleteResponses[0].status();
    console.info(`[saved-schools] DELETE /api/bookmarks/:id → ${deleteStatus}`);
    expect(deleteStatus).toBeGreaterThanOrEqual(200);
    expect(deleteStatus).toBeLessThan(300);

    // -----------------------------------------------------------------------
    // Step 5: The saved-schools page is now empty.
    // -----------------------------------------------------------------------
    await expect(async () => {
      expect(await page.getByText(/no saved schools yet/i).count()).toBeGreaterThan(0);
    }).toPass({ timeout: 15_000 });

    console.info('[saved-schools] List is empty — cleanup complete.');
    assertNoConsoleErrors(page);
  });
});

// ---------------------------------------------------------------------------
// SAVED SEARCHES (B13 / D12)
// ---------------------------------------------------------------------------

test.describe('saved searches (B13/D12)', () => {
  const SEARCH_NAME = `E2E-saved-search-${Date.now()}`;

  test('save a search, verify it lists, run it, then delete it', async ({ page }) => {
    attachConsoleErrorWatcher(page, IMAGE_400_ALLOWLIST);

    const postResponses = collectResponses(page, 'POST', /\/api\/saved-searches$/);
    const deleteResponses = collectResponses(page, 'DELETE', /\/api\/saved-searches\//);

    // -----------------------------------------------------------------------
    // Step 1: Navigate to spec-preview search and select a state filter (VIC).
    // -----------------------------------------------------------------------
    await page.goto(SEARCH_URL);
    await waitForSearchReady(page);

    // The SpecFilterSidebar's LocationFilterGroup renders state chips.
    // Each state is a toggle button in a FilterChipGroup. The VIC chip has text
    // matching the translated label "Victoria (VIC)".
    // We click it to set store.states = ['VIC'].
    const vicChip = page.getByRole('button', { name: /victoria.*VIC/i }).first();
    await expect(vicChip).toBeVisible({ timeout: 10_000 });
    await vicChip.click();

    // Confirm the chip is selected (aria-pressed="true").
    await expect(vicChip).toHaveAttribute('aria-pressed', 'true', { timeout: 5_000 });

    // -----------------------------------------------------------------------
    // Step 2: Open the "Save search" dialog, name it, save.
    // -----------------------------------------------------------------------
    const saveSearchBtn = page.getByRole('button', { name: /save search/i });
    await expect(saveSearchBtn).toBeVisible({ timeout: 10_000 });
    await saveSearchBtn.click();

    await expect(
      page.getByRole('dialog', { name: /save this search/i }),
    ).toBeVisible({ timeout: 10_000 });

    const nameInput = page.getByLabel(/name/i);
    await expect(nameInput).toBeVisible({ timeout: 5_000 });
    await nameInput.fill(SEARCH_NAME);

    const confirmBtn = page.getByRole('button', { name: /^save$/i });
    await expect(confirmBtn).toBeEnabled({ timeout: 5_000 });
    await confirmBtn.click();

    // Dialog closes after successful save.
    await expect(
      page.getByRole('dialog', { name: /save this search/i }),
    ).not.toBeVisible({ timeout: 10_000 });

    // -----------------------------------------------------------------------
    // Step 3: Assert POST /api/saved-searches returned 2xx.
    // -----------------------------------------------------------------------
    await expect(async () => {
      expect(postResponses.length).toBeGreaterThanOrEqual(1);
    }).toPass({ timeout: 10_000 });

    const createStatus = postResponses[0].status();
    console.info(`[saved-searches] POST /api/saved-searches → ${createStatus}`);
    expect(createStatus).toBeGreaterThanOrEqual(200);
    expect(createStatus).toBeLessThan(300);

    // -----------------------------------------------------------------------
    // Step 4: Navigate to /en/parent/saved-searches — item must appear.
    // -----------------------------------------------------------------------
    await page.goto('/en/parent/saved-searches');
    await page.waitForLoadState('networkidle');

    await expect(
      page.getByRole('heading', { name: /saved searches/i }),
    ).toBeVisible({ timeout: 15_000 });

    await expect(page.getByText(SEARCH_NAME, { exact: false })).toBeVisible({
      timeout: 15_000,
    });

    // -----------------------------------------------------------------------
    // Step 5: Click "Run search" — assert navigation to /parent/search with filter applied.
    // -----------------------------------------------------------------------
    // ParentSavedSearchesPage renders a Button[aria-label="Run search"] per item.
    const runBtn = page
      .locator('li')
      .filter({ hasText: SEARCH_NAME })
      .getByRole('button', { name: /run search/i });
    await expect(runBtn).toBeVisible({ timeout: 10_000 });
    await runBtn.click();

    // applySavedSearch(filterState) restores store.states = ['VIC'], then
    // router.push('/parent/search') navigates (no ?preview=spec).
    await page.waitForURL(/\/parent\/search/, { timeout: 15_000 });
    await page.waitForLoadState('networkidle');

    // After navigation to /parent/search (without ?preview=spec), the FilterSidebar
    // is visible. It renders state buttons with aria-pressed="true" for selected states.
    // VIC should be pressed because applySavedSearch set store.states = ['VIC'].
    const vicFilterBtn = page.getByRole('button', { name: /victoria.*VIC/i }).first();
    await expect(vicFilterBtn).toBeVisible({ timeout: 15_000 });
    const isVicSelected = await vicFilterBtn.getAttribute('aria-pressed');
    console.info(`[saved-searches] VIC filter pressed after run: "${isVicSelected}"`);
    expect(isVicSelected).toBe('true');

    // -----------------------------------------------------------------------
    // Step 6: Return to saved-searches and delete the item.
    // -----------------------------------------------------------------------
    await page.goto('/en/parent/saved-searches');
    await page.waitForLoadState('networkidle');

    await expect(page.getByText(SEARCH_NAME, { exact: false })).toBeVisible({
      timeout: 15_000,
    });

    const deleteBtn = page
      .locator('li')
      .filter({ hasText: SEARCH_NAME })
      .getByRole('button', { name: /delete/i });
    await expect(deleteBtn).toBeVisible({ timeout: 10_000 });
    await deleteBtn.click();

    // Assert DELETE returned 2xx.
    await expect(async () => {
      expect(deleteResponses.length).toBeGreaterThanOrEqual(1);
    }).toPass({ timeout: 10_000 });

    const deleteStatus = deleteResponses[0].status();
    console.info(`[saved-searches] DELETE /api/saved-searches/:id → ${deleteStatus}`);
    expect(deleteStatus).toBeGreaterThanOrEqual(200);
    expect(deleteStatus).toBeLessThan(300);

    // -----------------------------------------------------------------------
    // Step 7: The saved-searches page is now empty.
    // -----------------------------------------------------------------------
    await expect(async () => {
      expect(await page.getByText(/no saved searches yet/i).count()).toBeGreaterThan(0);
    }).toPass({ timeout: 15_000 });

    console.info('[saved-searches] List is empty — cleanup complete.');
    assertNoConsoleErrors(page);
  });
});
