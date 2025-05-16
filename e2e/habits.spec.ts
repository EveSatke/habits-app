import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';
const today = new Date().toISOString().split('T')[0];

test.describe('Habit Management E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveURL(`${BASE_URL}/day/${today}`);
  });

  test('User creates a new habit', async ({ page }) => {
    const newHabitName = 'test habit';
    await page.goto(BASE_URL);
    await expect(page).toHaveURL(`${BASE_URL}/day/${today}`);
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page).toHaveURL(`${BASE_URL}/add/${today}`);
    await page.getByRole('textbox', { name: 'Habit name' }).click();
    await page.getByRole('textbox', { name: 'Habit name' }).fill(newHabitName);
    await page.getByRole('button', { name: 'Create Habit' }).click();
    await expect(page.getByText(newHabitName)).toBeVisible();
  });

  test('User marks a habit as complete', async ({ page }) => {
    const habitToMarkName = 'Read a book';
    await createHabit(page, habitToMarkName);
    const habitItem = page.getByText(habitToMarkName);
    await expect(habitItem).toBeVisible();
    const habitCheckbox = page.getByRole('button', { name: 'checkbox' });
    await expect(habitCheckbox).not.toHaveClass(/bg-primary-500/);
    await page.getByRole('button', { name: 'checkbox' }).click();
    await expect(habitCheckbox).toHaveClass(/bg-primary-500/);
  });

  test('User edits an existing habit', async ({ page }) => {
    const originalHabitName = 'Habit to Edit';
    await createHabit(page, originalHabitName);
    const habitItem = page.getByText(originalHabitName);
    const updatedHabitName = 'Updated Habit Name';

    await expect(habitItem).toBeVisible();
    await page.getByRole('button').filter({ hasText: 'Edit' }).click();
    await page.getByRole('textbox', { name: 'Habit name' }).click();
    await page
      .getByRole('textbox', { name: 'Habit name' })
      .press('ControlOrMeta+a');
    await page
      .getByRole('textbox', { name: 'Habit name' })
      .fill('Updated Habit Name');
    await page.getByRole('button', { name: 'Save Changes' }).click();
    await expect(page.getByText(updatedHabitName)).toBeVisible();
    await expect(page.getByText(originalHabitName)).not.toBeVisible();
  });

  test('User changes the date to view habits', async ({ page }) => {
    const viewHabitName = 'May 14 habit';
    const habitItem = page.getByText(viewHabitName);
    await page.getByRole('button', { name: 'Wed 14 May' }).click();
    await page.getByRole('button', { name: 'Add habit' }).click();
    await page.getByRole('textbox', { name: 'Habit name' }).click();
    await page
      .getByRole('textbox', { name: 'Habit name' })
      .fill('May 14 habit');
    await page.getByRole('button', { name: 'Create Habit' }).click();
    await expect(habitItem).toBeVisible();
    await page.getByRole('button', { name: 'Thu 15 May' }).click();
    await expect(habitItem).toBeVisible();
    await page.getByRole('button', { name: 'Fri 16 May' }).click();
    await expect(habitItem).toBeVisible();
  });
});

async function createHabit(page: Page, habitName: string) {
  await page.getByRole('button', { name: 'Add habit' }).click();
  await expect(page.getByLabel('Habit name')).toBeVisible();
  await page.getByLabel('Habit name').fill(habitName);
  await page.getByRole('button', { name: 'Create Habit' }).click();

  await expect(page.getByRole('heading', { name: habitName })).toBeVisible({
    timeout: 10000,
  });
  console.log(`Helper: Habit "${habitName}" created.`);
}
