// Interface for review displayed the Product page
export interface ProductPageDisplayReview {
  productId: number
  userName: string
  rating: number
  createdAt: string
  description: string
  isEnabled : boolean
}

// Interface for review displayed for the Shopper's viewing in their profile
export interface ShopperDisplayReview {
  productId: number
  productName: string
  productImage: string
  reviewDescription: string
  reviewerUserName: string
  reviewRating: number
  reviewCreatedAt: string
}


// Interface for review stored in local storage
export interface Review {
  id: number
  productId: number
  description : string
  rating: number
  isEnabled: boolean
  userId: string
  createdAt: string
}

// Interface for displaying review for Admin's viewing
export interface AdminDisplayReview {
  reviewId: number
  productName: string
  productImage: string
  reviewDescription: string
  reviewRating: number
  reviewIsEnabled: boolean
  reviewerUserName: string
  reviewCreatedAt: string
}

// Interface for creating a new review
export interface CreateReview  {
  productId: number
  description: string
  rating: number
}
