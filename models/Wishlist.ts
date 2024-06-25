export interface DisplayWishlistItem {
  id: number
  productId: number
  productName: string
  productImage: string
  productPrice: number
}

export interface WishlistItem {
  id: number
  userId: string
  productId: number
}
