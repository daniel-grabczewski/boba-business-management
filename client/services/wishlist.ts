import { WishlistItem, DisplayWishlistItem} from '../../models/Wishlist'

// localStorage set, get. Both as Wishlist[]
// getWishlistWithExtraDetails() get wishlist as WithlistExtraDetails[]
// generateNewWishlistId()
// isProductInWishlistByProductId (productId) Return true or false, depending on whether the product associated with given product id is in the demo user's wish list.
// addProductToWishlistByProductId(productId) add product to wishlist
// deleteProductFromWishlistByProductId(productId)

// Replace localStorage wishlistItems with given wishlistItems
export function setWishlistItemsInLocalStorage(wishlistItems: WishlistItem[]): void {
  try {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems))
  } catch (error) {
    console.error('Failed to set wishlistItems in localStorage:', error)
  }
}