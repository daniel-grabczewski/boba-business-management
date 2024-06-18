import { NewReview, UpdatedReviewStatus } from '../../models/Reviews'

//!What if we have a system where we add a bunch of reviews as soon as the user boots up the app, so they are each added with the current date, with a time that is before the current time. So that way, when the user goes into the admin dashboard, it isn't competely empty.

//NEEDED SERVICE FUNCTIONS
//localStorage initial set, set, get
//getReviewsByProductId(productId) - Returns all reviews associated with given product id as ProductReview[]

//getCountOfReviewsFromDate(DD/MM/YYYY) - Returns count of reviews that were made on given date.

//getAllReviews() - replaced with getReviewsFromLocalStorage

//getReviewById(id) - get review associated with given id as ReviewExtraDetails

//recalculateAverageRatingOfProductById(productId) - get all products, recalculate average rating of the product associated with given product Id by averaging all ratings from all reviews associated with that product, then set modified products array back into products localStorage

//getAverageRatingOfProductById(productId) - gets average rating of a product associated with given product id

//getReviewsByUserId(userId) - gets all reviews associated with given userId as UserReview[]

//addDemoUserReview(newReview : NewReview) - adds review from demo user to reviews in localStorage. Then, recalculates average rating of the product they reviewed.

//updateReviewStatusById(id, status) - updates review isEnabled associated with given id to given status

//deleteUserReviewByProductId(productId, userId) - removes review associated with given userId and productId, then recalculates average rating of the product of which the review was removed



/*

export async function fetchReviewsByProductId(
  productId: number
) {
  try {
    const response = await request
      .get(`${baseUrl}/by-product-id/${productId}`)
    return response.body
  } catch (error) {
    console.error(
      'Error fetching reviews by product ID:',
      (error as Error).message,
    )
    throw { error: (error as Error).message }
  }
}

export async function fetchUserReviews(token: string) {
  try {
    const response = await request
      .get(`${baseUrl}/user`)
      .set('Authorization', `Bearer ${token}`)
    return response.body
  } catch (error) {
    console.error('Error fetching reviews of user:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

//!ADMIN ONLY FUNCTION
export async function fetchAmountOfReviewsByDate(date: string, token: string) {
  try {
    const response = await request
      .get(`${baseUrl}/amount-by-date/${date}`)
      .set('Authorization', `Bearer ${token}`)
    return response.body
  } catch (error) {
    console.error(
      'Error fetching amount of reviews by date:',
      (error as Error).message,
    )
    throw { error: (error as Error).message }
  }
}

//!ADMIN ONLY FUNCTION
export async function fetchAllReviews(token: string) {
  try {
    const response = await request
      .get(`${baseUrl}/all`)
      .set('Authorization', `Bearer ${token}`)
    return response.body
  } catch (error) {
    console.error('Error fetching all reviews:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

//!ADMIN ONLY FUNCTION
export async function fetchReviewById(id: number, token: string) {
  try {
    const response = await request
      .get(`${baseUrl}/by-review-id/${id}`)
      .set('Authorization', `Bearer ${token}`)
    return response.body
  } catch (error) {
    console.error('Error fetching review by ID:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

export async function addReview(newReview: NewReview, token: string) {
  try {
    const response = await request
      .post(`${baseUrl}/add`)
      .send(newReview)
      .set('Authorization', `Bearer ${token}`)
    return response.body
  } catch (error) {
    console.error('Error creating review:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

//!ADMIN ONLY FUNCTION
export async function modifyReviewStatusById(
  updatedReviewStatus: UpdatedReviewStatus,
  token: string,
) {
  try {
    const response = await request
      .patch(`${baseUrl}/update-status`)
      .send(updatedReviewStatus)
      .set('Authorization', `Bearer ${token}`)
    return response.body
  } catch (error) {
    console.error('Error modifying review status:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

export async function deleteReviewByProductId(
  productId: number,
  token: string,
) {
  try {
    const response = await request
      .delete(`${baseUrl}/remove/${productId}`)
      .set('Authorization', `Bearer ${token}`)
    return response.body
  } catch (error) {
    console.error('Error deleting review:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

*/