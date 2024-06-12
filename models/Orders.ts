export interface UserOrders {
  orderId: number
  purchasedAt: string
  totalAmount: number
}

// Is this needed?
export interface Orders {
  userName: string
  orderId: number
  totalSale: number
  purchasedAt: string
  shippingPrice: number
}

export interface Order {
  orderId: number
  userFirstName: string
  userLastName: string
  userAddress: string
  userCity: string
  userCountry: string
  userZipCode: string
  userEmail: string
  userPhoneNumber: string
  totalSale: number
  amountOfItems: number
  orderDate: string
  shippingType: string
  shippingPrice: number
  orderItems: {
    productName: string
    productSale: number
    productImage: string
    itemQuantity: number
  }[]
}

interface OrderItem {
  productId: number
  quantity: number
}

export interface OrderInitial {
  id: number
  userId: string
  purchasedAt: string
  shippingId: number
  orderItems: OrderItem[]
}

export type TransferedCart = {
  productId: number
  quantity: number
  shippingId: number
}
