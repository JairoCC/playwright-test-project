import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { LandingPage } from '../page-objects/LandingPage';
import { CheckoutPage } from '../page-objects/CheckoutPage';

test('add item to cart', async ({ page }) =>  {
    const loginPage = new LoginPage(page)
    const landingPage = new LandingPage(page)
    const checkoutPage = new CheckoutPage(page)
    await page.goto('https://www.saucedemo.com')
    await loginPage.Login('standard_user','secret_sauce')
    const item = await landingPage.addRandomProduct()
    await landingPage.clickOnShoppingCart()
    await checkoutPage.validateProductName(item)
    await checkoutPage.clickOnCheckoutButton()
    await checkoutPage.fillOutForm('Goku', 'Sayayin','1023')
    await checkoutPage.clickOnCotinue()
    await checkoutPage.clickOnFinish()
});