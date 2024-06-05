export interface UserOrders {
  orderId: number
  purchasedAt: string
  totalAmount: number
}

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

export interface PurchaseInitial {
  id : number
  userId : string
  productId : number
  quantity : number
  purchasedAt : string
  shippingId : number
  orderId : number
}

export type TransferedCart = {
  productId: number
  quantity: number
  shippingId: number
}[]
