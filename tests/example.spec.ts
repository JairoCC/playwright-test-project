import { test, expect } from '@playwright/test';
import { link } from 'fs';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/', { waitUntil: 'load', timeout: 60000 });

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/', { waitUntil: 'load', timeout: 60000 });

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('testing', async ({ page }) => {
  await page.goto('https://mercadolibre.com.co');
  await page.locator('input[id=\'cb1-edit\']').fill('Iphone')
  await page.keyboard.press("Enter")
  await expect(page.locator('//ol[contains(@class,\'ui-search-layout\')]')).toBeVisible()
  const titles = await page.locator('//ol[contains(@class,\'ui-search-layout\')]//li//h2').allInnerTexts()
  console.log('Total results: ', titles.length)
  for(let title of titles){
    console.log('The titles is: ', title)
  }
});

test('testing 2', async ({ page }) => {
  await page.goto('https://mercadolibre.com.co');
  //await page.getByRole('link',{name:'Mis compras'}).click()
  await page.getByRole('link',{name:'Ingresa', exact: true}).click()
});
