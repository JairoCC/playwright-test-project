import { Locator, Page } from "playwright";
import { expect } from "playwright/test";

export class CheckoutPage {

    readonly checkoutButton: Locator
    readonly continueButton: Locator
    readonly finishButton: Locator
    readonly confirmationText: Locator
    readonly firstNameTextbox: Locator
    readonly lastNameTextbox: Locator
    readonly postCodeTextbox: Locator
    readonly productName: Locator
    readonly productDescription: Locator
    readonly productPrice: Locator

    constructor(page: Page){
        this.checkoutButton = page.getByRole('button', {name: 'Checkout'})
        this.continueButton = page.getByRole('button', {name: 'Continue'})
        this.finishButton = page.getByRole('button', {name: 'Finish'})
        this.confirmationText = page.getByRole('heading', {name: 'Thank you for your order!'})
        this.firstNameTextbox = page.getByRole('textbox', {name: 'First Name'})
        this.lastNameTextbox = page.getByRole('textbox', {name: 'Last Name'})
        this.postCodeTextbox = page.getByRole('textbox', {name: 'Zip/Postal Code'})
        this.productName = page.locator(' .inventory_item_name')
        this.productDescription = page.locator(' .inventory_item_desc')
        this.productPrice = page.locator(' .inventory_item_price')
    }

    async validateProductName(item){ 
        const actualName = await this.productName.innerText()
        const actualDescription = await this.productDescription.innerText()
        const actualPrice = await this.productPrice.innerText()
        await expect(actualName).toEqual(item.itemName)
        expect(actualDescription).toEqual(item.itemDescription)
        expect(actualPrice).toEqual(item.itemPrice)
    }

    async clickOnCheckoutButton(){
        await this.checkoutButton.click()
    }

    async fillOutForm(firstName:string,lastName:string,postCode:string){
        await this.firstNameTextbox.fill(firstName)
        await this.lastNameTextbox.fill(lastName)
        await this.postCodeTextbox.fill(postCode)
    }

    async clickOnCotinue(){
        await this.continueButton.click()
    }

    async clickOnFinish(){
        await this.finishButton.click()
        await expect(this.confirmationText).toBeVisible()
    }

}