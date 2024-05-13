import { type Locator, type Page } from "playwright"

export class LoginPage {
    readonly usernameTextbox: Locator;
    readonly passwordTextbox: Locator;
    readonly loginButton: Locator;

    constructor(page: Page){
        this.usernameTextbox = page.getByRole('textbox', {name: 'Username'})

        this.passwordTextbox = page.getByRole('textbox', {name: 'Password'})

        this.loginButton = page.getByRole('button', {name: 'Login'})
    }

    async Login(user:string, password:string){
        await this.usernameTextbox.fill(user)
        await this.passwordTextbox.fill(password)
        await this.loginButton.click()
    }

}