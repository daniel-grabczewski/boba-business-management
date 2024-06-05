export interface CartItem {
  image: string
  name: string
  quantity: number
  price: number
  totalPrice: number
  productId: number
}

export interface CartItemInitial {
  id : number
  userId: string
  productId: number
  quantity: number
}

export interface CartTransferInfo {
  userId: string
  shippingId: number
}
