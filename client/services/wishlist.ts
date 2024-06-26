import { WishlistItem, DisplayWishlistItem } from '../../models/Wishlist'
import { getProductByIdAdmin } from './products'

// deleteProductFromWishlistByProductId(productId)

// Replace localStorage wishlistItems with given wishlistItems
export function setWishlistItemsInLocalStorage(
  wishlistItems: WishlistItem[]
): void {
  try {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems))
  } catch (error) {
    console.error('Failed to set wishlist items in localStorage:', error)
  }
}

// Retrieve array of objects 'wishlistItems' from localStorage
export function getWishlistItemsFromLocalStorage(): WishlistItem[] {
  try {
    const wishlistItems = localStorage.getItem('wishlistItems')
    return wishlistItems ? JSON.parse(wishlistItems) : []
  } catch (error) {
    console.error('Failed to get wishlist items from localStorage:', error)
    return []
  }
}

// Get wishlist items as DisplayWishlistItem[]
export function getDisplayWishlistItems(): DisplayWishlistItem[] {
  try {
    const wishlistItems = getWishlistItemsFromLocalStorage()

    const displayWishlistItems = wishlistItems
      .map(({ productId, id }) => {
        const product = getProductByIdAdmin(productId)
        if (product) {
          return {
            id,
            productId,
            productName: product.name,
            productImage: product.image,
            productPrice: product.price,
          }
        }
        return undefined
      })
      .filter(
        (wishlistItem) => wishlistItem !== undefined
      ) as DisplayWishlistItem[]

    return displayWishlistItems
  } catch (error) {
    console.error('Failed to get display wishlist items:', error)
    return []
  }
}

// Generate unique wishlistItem ID
export function generateNewWishlistItemId(): number {
  const wishlistItems = getWishlistItemsFromLocalStorage()
  const newId =
    wishlistItems.length > 0
      ? Math.max(...wishlistItems.map((wishlistItems) => wishlistItems.id)) + 1
      : 1

  return newId
}

// Return true or false, depending on whether the product associated with given product ID is in the demo user's wish list.
export function isProductInWishlistItemsByProductId(
  productId: number
): boolean {
  try {
    const wishlistItems = getWishlistItemsFromLocalStorage()
    const isProductInWishlist = wishlistItems.some(
      (wishlistItem) => wishlistItem.productId === productId
    )
    return isProductInWishlist
  } catch (error) {
    console.error(
      `Failed to check whether wishlist items contains product ID of ${productId}`,
      error
    )
    return false
  }
}

// Add product to wishlist with given product ID
export function addProductToWishlistItemsByProductId(productId: number) {
  try {
    if (isProductInWishlistItemsByProductId(productId)) {
      console.log(
        `Product with ID of ${productId} already exists in wishlistItems`
      )
    } else {
      const wishlistItems = getWishlistItemsFromLocalStorage()
      wishlistItems.push({ id: generateNewWishlistItemId(), productId })
      setWishlistItemsInLocalStorage(wishlistItems)
    }
  } catch (error) {
    console.error(
      `Failed to add product with ID ${productId} to wishlist items`,
      error
    )
  }
}
