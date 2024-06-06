import { CartItem } from '../../models/Cart'
import products from '../data/productsData'

/*
Required APIs:
addProductToCart
getCart
deleteProductFromCart
clearCart
modifyCartProductQuantity
*/

//retrieve array of objects 'cart' from localStorage
function getCartFromLocalStorage(): CartItem[] {
  const cart = localStorage.getItem('cart')
  return cart ? JSON.parse(cart) : []
}

//replace existing localStorage cart data with given cart data
function setCartInLocalStorage(cart: CartItem[]) {
  localStorage.setItem('cart', JSON.stringify(cart))
}

//getCart
export function getCartApi(): CartItem[] {
  return getCartFromLocalStorage()
}

//addProductToCart
export function addProductToCartByIdApi(productId: number, quantity = 1): void {
  const cart = getCartFromLocalStorage()
  const index = cart.findIndex((item) => item.productId === productId)

  if (index !== -1) {
    // If the product is already in the cart, increase its quantity by the specified amount
    cart[index].quantity += quantity
  } else {
    // If the product is not in the cart, add it with the specified quantity
    const product = products.find((item) => item.id === productId)
    if (product) {
      const newItem: CartItem = {
        image: product.image,
        name: product.name,
        quantity: quantity,
        price: product.price,
        totalPrice: product.price * quantity,
        productId: product.id,
      }
      cart.push(newItem)
    }
  }
  setCartInLocalStorage(cart)
}

