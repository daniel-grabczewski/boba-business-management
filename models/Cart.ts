export interface Cart {
  image: string
  name: string
  quantity: number
  price: number
  totalPrice: number
  productId: number
}

export interface CartClient extends Cart {
  auth0Id: string
}

export interface CartItem {
  userId: string
  productId: number
  quantity: number
}

export interface CartTransferInfo {
  userId: string
  shippingId: number
}
