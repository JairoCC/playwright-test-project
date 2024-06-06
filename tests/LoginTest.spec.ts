import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';

test('Successfull Login', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await page.goto('https://www.saucedemo.com')
    await loginPage.Login('standard_user','secret_sauce')
    await loginPage.ValidateLandingPage()
});

test('Wrong Password', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await page.goto('https://www.saucedemo.com')
    await loginPage.Login('standard_user','secret_sauce1')
    await loginPage.ErrorMessage("Epic sadface: Username and password do not match any user in this service")
});

test('locked out user login', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await page.goto('https://www.saucedemo.com')
    await loginPage.Login('locked_out_user','secret_sauce')
    await loginPage.ErrorMessage("Epic sadface: Sorry, this user has been locked out.")
});


