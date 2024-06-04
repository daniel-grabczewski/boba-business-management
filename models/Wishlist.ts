export interface WishlistProductView {
  id: number
  productId: number
  productName: string
  productImage: string
  productPrice: number
}

//Initial meaning that it is data before it is joined with other data files.
export interface WishlistProductInitial {
  id: number
  userId: string
  productId: number
}
