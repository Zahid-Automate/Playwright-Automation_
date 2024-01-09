import { test, expect } from '@playwright/test';
import { describe } from 'node:test';
test.describe('Practise Tests ',()=>{

  test('Verify Search in google page', async ({ page }) => {
    await page.goto('https://www.google.com/');
    await expect(page.getByLabel('Search', { exact: true })).toBeVisible();
    await page.goto('https://www.google.com/search?q=search+with+xpath+in+selenium&sca_esv=596647156&source=hp&ei=Yl-cZbXLGu6f0PEPnaSg4A0&iflsig=ANes7DEAAAAAZZxtcso2GzkIKBE2S55H0lJny39QpU3t&ved=0ahUKEwi1hM_z1M6DAxXuDzQIHR0SCNwQ4dUDCAw&uact=5&oq=&gs_lp=Egdnd3Mtd2l6IgBIAFAAWABwAHgAkAEAmAEAoAEAqgEAuAEDyAEA&sclient=gws-wiz');
    await page.getByRole('link', { name: 'How to find elements by XPath' }).click();
    await expect(page.getByRole('heading', { name: 'How to find elements by XPath' })).toBeVisible();
  });
  
  test('Verify Demo Playwright website ', async ({ page }) => {
      await page.goto('https://demo.playwright.dev/todomvc/#/');
      await page.getByPlaceholder('What needs to be done?').fill('feed the doc');
      await page.getByPlaceholder('What needs to be done?').press('Enter');
      await page.getByPlaceholder('What needs to be done?').fill('water the plants');
      await page.getByPlaceholder('What needs to be done?').press('Enter');
      await page.getByPlaceholder('What needs to be done?').fill('do some shopping');
      await page.getByPlaceholder('What needs to be done?').press('Enter');
      await expect(page.getByTestId('todo-title')).toHaveCount(3);
      await page.locator('li').filter({ hasText: 'feed the doc' }).getByLabel('Toggle Todo').check();
      await page.getByRole('link', { name: 'Active' }).click();
      await expect(page.getByTestId('todo-title')).toHaveCount(2);
      await page.getByRole('link', { name: 'Completed' }).click();
      await expect(page.getByTestId('todo-title')).toHaveCount(1);
    });
  
    test('Verify Playwright website and learn to debug ', async ({ page }) => {
      await page.goto('https://playwright.dev/');
      await page.getByRole('link', { name: 'get start' }).click();
      await expect(page).toHaveURL(/.*intro/);
    });
   

}

)
