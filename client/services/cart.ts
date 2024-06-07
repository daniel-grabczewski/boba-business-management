import { CartItem } from '../../models/Cart'
import products from '../data/productsData'

// Retrieve array of objects 'cart' from localStorage
function getCartFromLocalStorage(): CartItem[] {
  const cart = localStorage.getItem('cart')
  return cart ? JSON.parse(cart) : []
}

// Replace existing localStorage cart data with given cart data
function setCartInLocalStorage(cart: CartItem[]): void {
  localStorage.setItem('cart', JSON.stringify(cart))
}

// Get cart from localStorage
export function getCart(): CartItem[] {
  return getCartFromLocalStorage()
}

// Add a product to the cart by given productId and given quantity
export function addProductToCartById(productId: number, quantity = 1): void {
  const cart = getCartFromLocalStorage()
  const index = cart.findIndex((item) => item.productId === productId)

  if (index !== -1) {
    cart[index].quantity += quantity
  } else {
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

// Delete a product from the cart by given productId
export function deleteProductFromCart(productId: number): void {
  const cart = getCartFromLocalStorage()
  const updatedCart = cart.filter((item) => item.productId !== productId)
  setCartInLocalStorage(updatedCart)
}

// Remove all the items in the cart
export function clearCart(): void {
  setCartInLocalStorage([])
}

// Change quantity of a product in cart by given productId and quantity
export function modifyCartProductQuantity(productId: number, quantity: number): void {
  const cart = getCartFromLocalStorage()
  const index = cart.findIndex((item) => item.productId === productId)

  if (index !== -1) {
    cart[index].quantity = quantity
    setCartInLocalStorage(cart)
  }
}
