// ***** Order Summary Interfaces ***** //

export interface UserOrderSummary {
  orderId: number
  purchasedAt: string
  totalAmount: number
}

export interface AdminOrderSummary {
  userName: string
  orderId: number
  totalSale: number
  purchasedAt: string
  shippingPrice: number
}

// ***** Full Detail Order Interfaces ***** //

interface OrderItem {
  productName: string
  productSale: number
  productImage: string
  itemQuantity: number
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
  orderItems: OrderItem[]
}

// ***** Initial Order Interfaces ***** //
interface OrderItemInitial {
  productId: number
  quantity: number
}

export interface OrderInitial {
  id: number
  userId: string
  purchasedAt: string
  shippingId: number
  orderItems: OrderItemInitial[]
}

// ***** Cart Transfer Interfaces ***** //

export type TransferedCart = {
  productId: number
  quantity: number
  shippingId: number
}
