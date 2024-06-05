export interface CartItem {
  image: string
  name: string
  quantity: number
  price: number
  totalPrice: number
  productId: number
}

export interface CartTransferInfo {
  userId: string
  shippingId: number
}
