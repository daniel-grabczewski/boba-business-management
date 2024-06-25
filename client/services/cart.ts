import { CartItem, DisplayCartItem } from '../../models/Cart'
import { getAllProductsAdmin, getProductByIdAdmin } from './products'

// Replace existing localStorage cart items data with given cart items data
export function setCartItemsInLocalStorage(cartItems: CartItem[]): void {
  try {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  } catch (error) {
    console.error('Failed to set cart items in localStorage:', error)
  }
}

// Retrieve array of objects 'cartItems' from localStorage
export function getCartItemsFromLocalStorage(): CartItem[] {
  try {
    const cartItems = localStorage.getItem('cartItems')
    return cartItems ? JSON.parse(cartItems) : []
  } catch (error) {
    console.error('Failed to get cart items from localStorage:', error)
    return []
  }
}

// Retrieve all cart items, combine it with product data, and return DisplayCartItem[]
export function getDisplayCartItems(): DisplayCartItem[] {
  try {
    const cartItems = getCartItemsFromLocalStorage()
    const displayCartItems = cartItems
      .map((cartItem) => {
        const product = getProductByIdAdmin(cartItem.productId)
        if (product) {
          return {
            id: cartItem.id,
            image: product.image,
            name: product.name,
            quantity: cartItem.quantity,
            price: product.price,
            totalPrice: product.price * cartItem.quantity,
            productId: product.id,
          }
        }
        return undefined
      })
      .filter((item) => item !== undefined) as DisplayCartItem[]

    return displayCartItems
  } catch (error) {
    console.error('Error retrieving display cart items:', error)
    return []
  }
}

// Returns new cart id, unique from every other cart id
export function generateNewCartItemId(): number {
  const cartItems = getCartItemsFromLocalStorage()
  const newId =
    cartItems.length > 0
      ? Math.max(...cartItems.map((cartItem) => cartItem.id)) + 1
      : 1

  return newId
}

// Add a cart item with given productId and given quantity
export function addItemToCartByProductId(
  productId: number,
  quantity = 1
): void {
  try {
    const cartItems = getCartItemsFromLocalStorage()
    const index = cartItems.findIndex(
      (cartItem) => cartItem.productId === productId
    )

    if (index !== -1) {
      cartItems[index].quantity += quantity
    } else {
      const newCartItem: CartItem = {
        id: generateNewCartItemId(),
        productId: productId,
        quantity: quantity,
      }
      cartItems.push(newCartItem)
    }
    setCartItemsInLocalStorage(cartItems)
  } catch (error) {
    console.error(
      `Failed to add cart item with product ID: ${productId}`,
      error
    )
  }
}

// Delete a cart item from the cart that is has the given productId
export function deleteItemFromCartByProductId(productId: number): void {
  try {
    const cartItems = getCartItemsFromLocalStorage()
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.productId !== productId
    )
    setCartItemsInLocalStorage(updatedCartItems)
  } catch (error) {
    console.error(
      `Failed to delete cart item associated with product ID: ${productId}`,
      error
    )
  }
}

// Delete all the items in the cart
export function deleteAllCartItems(): void {
  try {
    setCartItemsInLocalStorage([])
  } catch (error) {
    console.error('Failed to delete all cart items:', error)
  }
}

// Update cart item quantity of product by given productId and quantity
export function updateCartItemQuantityByProductId(
  productId: number,
  quantity: number
): void {
  try {
    const cartItems = getCartItemsFromLocalStorage()
    const index = cartItems.findIndex(
      (cartItem) => cartItem.productId === productId
    )

    if (index !== -1) {
      cartItems[index].quantity = quantity
      setCartItemsInLocalStorage(cartItems)
    } else {
      console.error(`Product with ID: ${productId} not found in any cart items`)
    }
  } catch (error) {
    console.error(
      `Failed to modify cart item quantity associated with product ID: ${productId}`,
      error
    )
  }
}
