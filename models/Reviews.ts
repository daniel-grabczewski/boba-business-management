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

export interface ReviewForTable {
  id: number
  productName: string
  rating: number
  isEnabled: boolean
  userName: string
  createdAt: string
}

export interface Review {
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
