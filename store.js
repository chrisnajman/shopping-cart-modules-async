const URL_STORE_ITEMS = "./items.json"
import formatCurrency from "./utils/formatCurrency.js"
import { addToCart } from "./shoppingCart.js"
import addGlobalEventListener from "./utils/addGlobalEventListener.js"

const storeItemContainer = document.querySelector("[data-store-container]")
const storeItemTemplate = document.getElementById("store-item-template")

const IMAGE_URL = "https://dummyimage.com/420x260/"

export async function setupStore() {
  try {
    const response = await fetch(URL_STORE_ITEMS)

    if (response.ok) {
      const items = await response.json()

      if (storeItemContainer === null) return
      addGlobalEventListener("click", "[data-add-to-cart-button]", (e) => {
        const id = e.target.closest("[data-store-item]").dataset.itemId
        addToCart(parseInt(id))
      })

      items.forEach((item) => {
        const storeItem = storeItemTemplate.content.cloneNode(true)

        // id (.id)
        const container = storeItem.querySelector("[data-store-item]")
        container.dataset.itemId = item.id

        // image url (.imageColor)
        const image = storeItem.querySelector("[data-image]")
        image.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`

        image.alt = `${item.category}: ${item.name}`

        // category (.category)
        const category = storeItem.querySelector("[data-category]")
        category.textContent = item.category

        // name (.name)
        const name = storeItem.querySelector("[data-name]")
        name.textContent = item.name

        // price (.priceCents)
        const price = storeItem.querySelector("[data-price]")
        price.textContent = formatCurrency(item.pricePence / 100)

        storeItemContainer.appendChild(storeItem)
      })
    } else {
      console.log("Something went wrong...")
    }
  } catch (e) {
    console.log(e)
  }
}
