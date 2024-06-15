export interface ProductReview {
  productId: number
  userName: string
  rating: number
  createdAt: string
  description: string
}

export interface UserReview {
  productId: number
  productName: string
  productImage: string
  reviewDescription: string
  reviewerUserName: string
  reviewRating: number
  reviewCreatedAt: string
}

// ***** Initial Review Interface ***** //
export interface Review {
  id: number
  productId: number
  description : string
  rating: number
  isEnabled: boolean
  userId: string
  createdAt: string
}

// ***** Full Detail Review Interface ***** //
export interface ReviewExtraDetails {
  reviewId: number
  productName: string
  productImage: string
  reviewDescription: string
  reviewRating: number
  reviewIsEnabled: boolean
  reviewerUserName: string
  reviewCreatedAt: string
}

export interface NewReview {
  productId: number
  description: string
  rating: number
}

export interface UpdatedReviewStatus {
  id: number
  isEnabled: boolean
}
