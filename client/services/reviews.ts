import { NewReview, UpdatedReviewStatus, Review, ProductReview, ReviewExtraDetails } from '../../models/Reviews'
import initialReviews from '../data/reviewsData'
import { getProductByIdAdmin } from './products'
import { getUserByUserId } from './users'

//!What if we have a system where we add a bunch of reviews as soon as the user boots up the app, so they are each added with the current date, with a time that is before the current time. So that way, when the user goes into the admin dashboard, it isn't competely empty.


// Initialize new key 'reviews' to be equal to value of initialReviews IF localStorage 'reviews' key doesn't exist
export function setReviewsInLocalStorageInitial(): void {
  try {
    const reviewsInStorage = localStorage.getItem('reviews')

    if (!reviewsInStorage) {
      localStorage.setItem('reviews', JSON.stringify(initialReviews))
    }
  } catch (error) {
    console.error('Failed to initialize reviews in localStorage:', error)
  }
}

// Replace localStorage reviews with given reviews
export function setReviewsInLocalStorage(reviews: Review[]): void {
  try {
    localStorage.setItem('reviews', JSON.stringify(reviews))
  } catch (error) {
    console.error('Failed to set reviews in localStorage:', error)
  }
}

// Retrieve array of objects 'reviews' from localStorage
export function getReviewsFromLocalStorage(): Review[] {
  try {
    const reviews = localStorage.getItem('reviews')
    return reviews ? JSON.parse(reviews) : []
  } catch (error) {
    console.error('Failed to get reviews from localStorage:', error)
    return []
  }
}

// Get all reviews associated with given product id as ProductReview[]
export function getReviewsByProductId(productId: number): ProductReview[] {
  try {
    const reviews = getReviewsFromLocalStorage()
    const reviewsForProduct = reviews
      .filter(review => review.productId === productId)
      .map(({ productId, userId, rating, createdAt, description }) => {
        try {
          const userName = getUserByUserId(userId)?.userName || 'Error Retrieving User'
          return { productId, userName, rating, createdAt, description }
        } catch (userError) {
          console.error(`Failed to retrieve user details for userId ${userId}:`, userError)
          return { productId, userName: 'Error Retrieving User', rating, createdAt, description }
        }
      })
    return reviewsForProduct
  } catch (error) {
    console.error('Failed to get reviews for product id:', error)
    return []
  }
}

// get review assosciated with given id as ReviewExtraDetails
export function getReviewById(id: number): ReviewExtraDetails | undefined {
  try {
    const reviews = getReviewsFromLocalStorage()
    const review = reviews.find(review => review.id === id)
    if (!review) {
      console.log(`Review with id ${id} not found`)
      return undefined
    }

    const userName = getUserByUserId(review.userId)?.userName || 'Error retrieving user'
    const product = getProductByIdAdmin(review.productId)
    
    return {
      reviewId: review.id,
      productName: product?.name || 'Error retrieving product',
      productImage: product?.image || 'Error retrieving product',
      reviewDescription: review.description,
      reviewRating: review.rating,
      reviewIsEnabled: review.isEnabled,
      reviewerUserName: userName,
      reviewCreatedAt: review.createdAt,
    }
  } catch (error) {
    console.error(`Failed to get review for id ${id}:`, error)
    return undefined
  }
}


//getCountOfReviewsFromDate(DD/MM/YYYY) - Returns count of reviews that were made on given date.

//recalculateAverageRatingOfProductById(productId) - get all products, recalculate average rating of the product associated with given product Id by averaging all ratings from all reviews associated with that product, then set modified products array back into products localStorage

//getAverageRatingOfProductById(productId) - gets average rating of a product associated with given product id

//getReviewsByUserId(userId) - gets all reviews associated with given userId as UserReview[]

//addDemoUserReview(newReview : NewReview) - adds review from demo user to reviews in localStorage. Then, recalculates average rating of the product they reviewed.

//updateReviewStatusById(id, status) - updates review isEnabled associated with given id to given status

//deleteUserReviewByProductId(productId, userId) - removes review associated with given userId and productId, then recalculates average rating of the product of which the review was removed


