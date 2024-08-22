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

export interface OrderItemExtraDetails {
  productName: string
  productSale: number
  productImage: string
  itemQuantity: number
}

export interface OrderExtraDetails {
  orderId: number
  firstName: string
  lastName: string
  address: string
  city: string
  country: string
  zipCode: string
  email: string
  phoneNumber: string
  totalSale: number
  amountOfItems: number
  purchasedAt: string
  shippingType: string
  shippingPrice: number
  orderItemsExtraDetails: OrderItemExtraDetails[]
}

// ***** Initial Order Interfaces ***** //
export interface OrderItem {
  productId: number
  quantity: number
}

export interface Order {
  id: number
  userId: string
  purchasedAt: string
  shippingId: number
  phoneNumber: string
  firstName: string
  lastName: string
  address: string
  city: string
  zipCode: string
  country: string
  orderItems: OrderItem[]
}

// Interface for shopper's details entered in checkout page
export interface OrderCheckoutDetails {
  shippingId: number
  phoneNumber: string
  firstName: string
  lastName: string
  address: string
  city: string
  zipCode: string
  country: string
}

// ***** Cart Transfer Interfaces ***** //

export type TransferedCart = {
  productId: number
  quantity: number
  shippingId: number
}
