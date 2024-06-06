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

// Retrieve array of objects 'cart' from localStorage
function getCartFromLocalStorage(): CartItem[] {
  const cart = localStorage.getItem('cart')
  return cart ? JSON.parse(cart) : []
}

// Replace existing localStorage cart data with given cart data
function setCartInLocalStorage(cart: CartItem[]) {
  localStorage.setItem('cart', JSON.stringify(cart))
}

//getCart
export function getCartApi(): CartItem[] {
  return getCartFromLocalStorage()
}

//addProductToCart
export function addProductToCartByIdApi(productId: number, quantity = 1): void {
  // Retrieve cart from localStorage
  const cart = getCartFromLocalStorage()

  // Find index of cart array that matches given productId
  const index = cart.findIndex((item) => item.productId === productId)

  // If the product is already in the cart, increase its quantity by the specified amount
  if (index !== -1) {
    cart[index].quantity += quantity
  } else {
    // If the product is not in the cart, add it with the specified quantity

    // Search through products data to find product that matches given productId
    const product = products.find((item) => item.id === productId)
    if (product) {
      // If product is found, assign desired data to newItem, matching CartItem interface
      const newItem: CartItem = {
        image: product.image,
        name: product.name,
        quantity: quantity,
        price: product.price,
        totalPrice: product.price * quantity,
        productId: product.id,
      }

      // Add newItem to the cart array
      cart.push(newItem)
    }
  }
  // Replace cart in localStorage with new cart
  setCartInLocalStorage(cart)
}

//deleteProductFromCart
export function deleteProductFromCartApi(productId: number): void {
  // Retrieve cart from localStorage
  const cart = getCartFromLocalStorage()

  // Filter out product from cart that matches given productId, then assign result to new updatedCart
  const updatedCart = cart.filter((item) => item.productId !== productId)

  // Replace cart in localStorage with updatedCart
  setCartInLocalStorage(updatedCart)
}
