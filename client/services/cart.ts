import { CartItem, DisplayCartItem } from '../../models/Cart'
import { getProductByIdAdmin, getStockByProductId } from './products'

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

// Add a cart item with given productId and given quantity, ONLY if there is enough stock to allow it. If there isn't enough stock for the desired quantity, do nothing
export function addItemToCartByProductId(
  productId: number,
  quantity = 1
): void {
  try {
    const cartItems = getCartItemsFromLocalStorage()
    const index = cartItems.findIndex(
      (cartItem) => cartItem.productId === productId
    )
    const currentCartItemQuantity = index !== -1 ? cartItems[index].quantity : 0

    const productStock = getStockByProductId(productId)

    if (productStock < currentCartItemQuantity + quantity) {
      console.log('Not enough stock available')
      return
    }

    if (index !== -1) {
      cartItems[index].quantity += quantity
    } else {
      const newCartItem = {
        id: generateNewCartItemId(), // Ensure this function generates a unique ID
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

// Given a product ID, reduce the associated product's quantity by the requested quantity to remove variable
export function reduceCartItemQuantityByProductId(
  productId: number,
  quantityToRemove = 1
): void {
  try {
    const cartItems = getCartItemsFromLocalStorage()
    const index = cartItems.findIndex(
      (cartItem) => cartItem.productId === productId
    )

    if (index === -1) {
      return
    }

    const newQuantity = cartItems[index].quantity - quantityToRemove

    if (newQuantity <= 0) {
      deleteItemFromCartByProductId(productId)
    } else {
      cartItems[index].quantity = newQuantity
      setCartItemsInLocalStorage(cartItems)
    }
  } catch (error) {
    console.error(
      `Error reducing cart item's quantity with product ID: ${productId}`,
      error
    )
  }
}

// Given a product ID, return the quantity of the associated product that is in the user's cart. If the product isn't in the cart, return 0
export function getQuantityFromCartByProductId(productId: number): number {
  try {
    const cartItems = getCartItemsFromLocalStorage()
    const cartItemQuantity = cartItems.find(
      (cartItem) => cartItem.productId === productId
    )?.quantity

    return cartItemQuantity || 0
  } catch (error) {
    console.error(
      `Error getting the quantity in cart of item with product ID: ${productId}`,
      error
    )
    return 0
  }
}

//Given the product ID, return the available stock of the associated product by subtracting the product's quantity in cart from the stock of the product
export function getAvailableStockByProductId(productId: number): number {
  try {
    return (
      getStockByProductId(productId) - getQuantityFromCartByProductId(productId)
    )
  } catch (error) {
    console.error(
      `Error getting available stock for product with ID: ${productId}`,
      error
    )
    return 0
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
