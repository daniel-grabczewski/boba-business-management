import { WishlistItem, DisplayWishlistItem} from '../../models/Wishlist'
import { getProductByIdAdmin } from './products'

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
    
    const displayWishlistItems = wishlistItems.map(({productId, id}) => {
      const product = getProductByIdAdmin(productId)
      if (product) {
        return {
          id,
          productId,
          productName: product.name,
          productImage: product.image ,
          productPrice: product.price,
        }
      }
      return undefined
      
    }).filter(wishlistItem => wishlistItem !== undefined) as DisplayWishlistItem[]

    return displayWishlistItems
  } catch (error) {
    console.error('Failed to get display wishlist items:', error)
    return []
  }
}