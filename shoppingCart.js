const URL_STORE_ITEMS = "./items.json"
import formatCurrency from "./utils/formatCurrency.js"
import addGlobalEventListener from "./utils/addGlobalEventListener.js"

/* HTML selectors */
const cartButton = document.querySelector("[data-cart-button]")
const cartItemsWrapper = document.querySelector("[data-cart-items-wrapper]")
let shoppingCart = []
const IMAGE_URL = "https://dummyimage.com/210x130"
const cart = document.querySelector("[data-cart]")
const cartItemContainer = document.querySelector("[data-cart-items]") // Output container
const cartTotal = document.querySelector("[data-cart-total]")
const cartQuantity = document.querySelector("[data-cart-quantity]")
const cartItemTemplate = document.getElementById("cart-item-template")

const SESSION_STORAGE_KEY = "SHOPPING_CART-cart-async"

export function setupShoppingCart() {
  addGlobalEventListener("click", "[data-remove-from-cart-button]", (e) => {
    const id = parseInt(e.target.closest("[data-item]").dataset.itemId)
    removeFromCart(id)
  })
  shoppingCart = loadCart()
  renderCart()
  cartButton.addEventListener("click", () => {
    cartItemsWrapper.classList.toggle("invisible")
  })
}

function saveCart() {
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(shoppingCart))
}

function loadCart() {
  const cart = sessionStorage.getItem(SESSION_STORAGE_KEY)
  return JSON.parse(cart) || []
}

// Add items to cart
export function addToCart(id) {
  const existingItem = shoppingCart.find((entry) => entry.id === id)
  if (existingItem) {
    existingItem.quantity++
  } else {
    shoppingCart.push({ id: id, quantity: 1 })
  }

  renderCart()
  saveCart()
}

function removeFromCart(id) {
  const existingItem = shoppingCart.find((entry) => entry.id === id)
  if (existingItem === null) return
  shoppingCart = shoppingCart.filter((entry) => entry.id !== id)
  renderCart()
  saveCart()
}

function renderCart() {
  if (shoppingCart.length === 0) {
    hideCart()
  } else {
    showCart()
    renderCartItems()
  }
}

function hideCart() {
  cart.classList.add("invisible")
}

function showCart() {
  cart.classList.remove("invisible")
}

async function renderCartItems() {
  try {
    const response = await fetch(URL_STORE_ITEMS)

    if (response.ok) {
      const items = await response.json()

      cartQuantity.textContent = shoppingCart.length

      const totalCents = shoppingCart.reduce((sum, entry) => {
        const item = items.find((i) => entry.id === i.id)
        return sum + item.pricePence * entry.quantity
      }, 0)

      cartTotal.textContent = formatCurrency(totalCents / 100)
      cartItemContainer.innerHTML = ""
      shoppingCart.forEach((entry) => {
        const item = items.find((i) => entry.id === i.id)
        const cartItem = cartItemTemplate.content.cloneNode(true)

        const container = cartItem.querySelector("[data-item]")
        container.dataset.itemId = item.id

        // image url (.imageColor)
        const image = cartItem.querySelector("[data-image]")
        image.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`
        image.alt = `${item.category}: ${item.name}`

        // name (.name)
        const name = cartItem.querySelector("[data-name]")
        name.textContent = item.name

        // quantity
        if (entry.quantity > 1) {
          const quantity = cartItem.querySelector("[data-quantity]")

          quantity.textContent = `\xD7${entry.quantity}` // \xD7 = multiplication symbol
        }

        // price (.priceCents)
        const price = cartItem.querySelector("[data-price]")
        price.textContent = formatCurrency(
          (item.pricePence * entry.quantity) / 100
        )

        cartItemContainer.appendChild(cartItem)
      })
    } else {
      console.log("Something went wrong...")
    }
  } catch (e) {
    console.log(e)
  }
}

// Persist across multiple pages (session storage)

/***************************************************************************************************** */

/** ARRAY METHODS 
==================
==================

All methods --

do NOT execute the function for empty elements.

do NOT change the original array.

.find() and .reduce() merely return something.
==============================================

.find() :

returns the value of the first element that passes a test.
                         -----
executes a function for each array element.

returns undefined if no elements are found.

.reduce() :

executes a reducer function for array element.

returns a single value: the function's accumulated result.

.filter() and .map() create new arrays.
==============================================

.filter() :

creates a new array filled with elements that pass a test provided by a function.


.map() :

creates a new array from calling a function for every array element.

calls a function once for each element in an array.
                 ---------------------




*/
