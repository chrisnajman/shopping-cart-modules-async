---
permalink: /index.html
---

[Website (Git Pages)](https://chrisnajman.github.io/shopping-cart-modules-async)

# Shopping Cart

I built this following a tutorial (see _Source_, below). My only contribution was to strip out the node modules bundling code, replacing it
with `async await` to fetch `items.json`.

## Features

- Cart persists over multiple pages (using session storage)
- Running total given.
- Items can be removed from the cart.
- Multiple items of the same type can be added to the cart.

## Javascript

- ES6 Modules,
- Not transpiled.

## CSS

- _tailwind.css_ used throughout (the HTML was already supplied).
- I used inline styles for a few customisations.

## Testing

- Tested on:
  - Windows 10
    - Chrome
    - Firefox
    - Microsoft Edge

## Source

- Shopping Cart tutorial by [Kyle Cook, WebDev Simplified](https://courses.webdevsimplified.com/view/courses/javascript-simplified-beginner/521740-modules-bundlers/1511556-74-shopping-cart)
