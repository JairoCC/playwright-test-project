import { type Locator, type Page } from "playwright"
import { expect } from "playwright/test";

export class LoginPage {
    readonly usernameTextbox: Locator;
    readonly passwordTextbox: Locator;
    readonly loginButton: Locator;
    readonly loginErrorMessage: Locator;
    readonly loginLandingPage: Locator;

    constructor(page: Page){
        this.usernameTextbox = page.getByRole('textbox', {name: 'Username'})
        this.passwordTextbox = page.getByRole('textbox', {name: 'Password'})
        this.loginButton = page.getByRole('button', {name: 'Login'})
        this.loginErrorMessage = page.locator('h3[data-test="error"]')
        this.loginLandingPage = page.locator('data-test="title"')
    }

    async Login(user:string, password:string){
        await this.usernameTextbox.fill(user)
        await this.passwordTextbox.fill(password)
        await this.loginButton.click()
    }

    async ErrorMessage(message: string){
        const errorMessage = await this.loginErrorMessage.innerText()
        expect(errorMessage).toBe(message)
    }

    async ValidateLandingPage(){
        await this.loginLandingPage.isVisible()
    }

}