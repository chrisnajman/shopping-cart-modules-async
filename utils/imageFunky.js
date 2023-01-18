const IMAGE_URL = "https://dummyimage.com/"

export default function imageFunky(size, imageColor) {
  return `${IMAGE_URL}/${size}/${imageColor}/${imageColor}`
}

/*
I HAVEN'T ACTUALLY USED THIS - JUST WANTED TO SEE IF IT WOULD WORK - IT DOES.



store.js:
Can't call the function 'image' - must be reserved word or something
import imageFunky from "./utils/imageFunky"
image.src = imageFunky("420x260", item.imageColor)

shoppingCart.js
import imageFunky from "./utils/imageFunky"
image.src = imageFunky("210x130", item.imageColor)
*/

/*
  This could be generalised even further:

  const IMAGE_URL = "https://dummyimage.com/"

export default function imageFunky(urlFragment1, urlFragment2) {
  return `${IMAGE_URL}/${urlFragment1}/${urlFragment2}/${urlFragment2}`
}

*/
