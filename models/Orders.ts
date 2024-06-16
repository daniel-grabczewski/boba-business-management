// ***** Order Summary Interfaces ***** //

export interface UserOrderSummary {
  orderId: number
  purchasedAt: string
  totalSale: number
}

export interface AdminOrderSummary {
  userName: string
  orderId: number
  totalSale: number
  purchasedAt: string
  shippingPrice: number
}

// ***** Full Detail Order Interfaces ***** //

interface OrderItemExtraDetails {
  productName: string
  productSale: number
  productImage: string
  itemQuantity: number
}

export interface OrderExtraDetails {
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
  orderItems: OrderItemExtraDetails[]
}

// ***** Initial Order Interfaces ***** //
interface OrderItem {
  productId: number
  quantity: number
}

export interface Order {
  id: number
  userId: string
  purchasedAt: string
  shippingId: number
  orderItems: OrderItem[]
}

// ***** Cart Transfer Interfaces ***** //

export type TransferedCart = {
  productId: number
  quantity: number
  shippingId: number
}
