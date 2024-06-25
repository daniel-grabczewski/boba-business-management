// Represents the detailed data needed for displaying the cart item in a React component
export interface DisplayCartItem {
  id : number
  image: string
  name: string
  quantity: number
  price: number
  totalPrice: number
  productId: number
}

// Represents a single cart item within the cart with minimal data needed for storage
export interface CartItem {
  id : number
  productId : number
  quantity : number
}
