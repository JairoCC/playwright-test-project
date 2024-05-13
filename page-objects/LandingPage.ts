import { Locator, Page } from "playwright";
import { expect } from "playwright/test";

export class LandingPage {

     readonly productItem: Locator
     readonly addItemButton: Locator
     readonly cartButton: Locator
     readonly checkoutPage: Locator


     constructor(page: Page){
        this.productItem = page.locator('#inventory_container .inventory_item')
        this.addItemButton = page.getByRole('button',{name:'Add to cart'})
        this.cartButton = page.locator('a.shopping_cart_link')
        this.checkoutPage = page.getByRole('button', {name: 'Checkout'})

     }

     async addRandomProduct(){
        const itemsContainer = await this.productItem.all()
        const randomIndex = Math.floor(Math.random() * itemsContainer.length)
        const randomItem = itemsContainer[randomIndex]
        const itemName = await randomItem.locator(' .inventory_item_name').innerText()
        const itemDescription = await randomItem.locator('.inventory_item_desc').innerText()
        const itemPrice = await randomItem.locator(' .inventory_item_price').innerText()
        await randomItem.getByRole('button',{name:'Add to cart'}).click()
        const item = {
            itemName,
            itemDescription,
            itemPrice
        }
        return item
     }

     async clickOnShoppingCart(){
        await this.cartButton.click()
        await expect(this.checkoutPage).toBeVisible()
     }


}