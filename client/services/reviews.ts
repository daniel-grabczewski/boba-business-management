import {
  NewReview,
  UpdatedReviewStatus,
  Review,
  ProductReview,
  ReviewExtraDetails,
  UserReview,
} from '../../models/Reviews'
import initialReviews from '../data/reviewsData'
import { formatDateToDDMMYYYY } from '../utils/formatDate'
import {
  getAllProductsAdmin,
  getProductByIdAdmin,
  setProductsInLocalStorage,
} from './products'
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
      .filter((review) => review.productId === productId)
      .map(({ productId, userId, rating, createdAt, description }) => {
        try {
          const userName =
            getUserByUserId(userId)?.userName || 'Error Retrieving User'
          return { productId, userName, rating, createdAt, description }
        } catch (userError) {
          console.error(
            `Failed to retrieve user details for userId ${userId}:`,
            userError
          )
          return {
            productId,
            userName: 'Error Retrieving User',
            rating,
            createdAt,
            description,
          }
        }
      })
    return reviewsForProduct
  } catch (error) {
    console.error('Failed to get reviews for product id:', error)
    return []
  }
}

// Get review assosciated with given id as ReviewExtraDetails
export function getReviewById(id: number): ReviewExtraDetails | undefined {
  try {
    const reviews = getReviewsFromLocalStorage()
    const review = reviews.find((review) => review.id === id)
    if (!review) {
      console.log(`Review with id ${id} not found`)
      return undefined
    }

    const userName =
      getUserByUserId(review.userId)?.userName || 'Error retrieving user'
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

// Get count of amount of reviews that were created on given date in DD/MM/YYYY format.
export function getCountOfReviewsFromDate(date: string): number {
  try {
    const reviews = getReviewsFromLocalStorage()
    const count = reviews.reduce((accumulator, review) => {
      const convertedDateOfReview = formatDateToDDMMYYYY(review.createdAt)
      if (convertedDateOfReview === date) {
        accumulator++
      }
      return accumulator
    }, 0)

    return count
  } catch (error) {
    console.error('Failed to get count of reviews from date:', error)
    return 0
  }
}

// Recalculate rating of a product associated with the given product id
export function recalculateAverageRatingOfProductById(productId: number): void {
  try {
    const reviews = getReviewsByProductId(productId) // Reviews are as ProductReview[]
    const products = getAllProductsAdmin()
    const productIndex = products.findIndex(
      (product) => product.id === productId
    )

    if (productIndex === -1) {
      console.log(`Product with id ${productId} not found`)
      return
    }

    if (reviews.length === 0) {
      console.log(`No reviews found for product with id ${productId}`)
      products[productIndex].averageRating = 0
    } else {
      const sumOfRatings = reviews.reduce(
        (accumulator, review) => review.rating + accumulator,
        0
      )

      const newAverageRating = sumOfRatings / reviews.length
      products[productIndex].averageRating = newAverageRating
    }

    setProductsInLocalStorage(products)
  } catch (error) {
    console.error(
      'Failed to recalculate average rating for product id:',
      productId,
      error
    )
  }
}


// Recalculate all products' average ratings
export function recalculateAllProductsAverageRating(): void {
  try {
    const products = getAllProductsAdmin()
    for (const product of products) {
      recalculateAverageRatingOfProductById(product.id)
    }
  } catch (error) {
    console.error('Failed to recalculate all products average ratings:', error)
  }
}

// Get all reviews associated with given userId as UserReview[]
export function getReviewsByUserId(userId: string): UserReview[] {
  try {
    const reviews = getReviewsFromLocalStorage()
    const userReviews = reviews
      .filter(review => review.userId === userId)
      .map(({ productId, description, rating, createdAt }) => {
        const reviewProduct = getProductByIdAdmin(productId)
        if (reviewProduct) {
          return {
            productId,
            productName: reviewProduct.name,
            productImage: reviewProduct.image,
            reviewDescription: description,
            reviewerUserName: userId,
            reviewRating: rating,
            reviewCreatedAt: createdAt
          }
        }
        return undefined 
      })
      .filter(review => review !== undefined) 

    return userReviews as UserReview[] 
  } catch (error) {
    console.error(`Failed to get user ${userId} reviews`, error)
    return []
  }
}




//addDemoUserReview(newReview : NewReview) - adds review from demo user to reviews in localStorage. Then, recalculates average rating of the product they reviewed.

//updateReviewStatusById(id, status) - updates review isEnabled associated with given id to given status

//deleteUserReviewByProductId(productId, userId) - removes review associated with given userId and productId, then recalculates average rating of the product of which the review was removed
