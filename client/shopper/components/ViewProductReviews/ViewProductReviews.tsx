import { useState, useMemo, useEffect } from 'react'
import { useMutation } from 'react-query'
import {
  CreateReview,
  ProductPageDisplayReview,
} from '../../../../models/Reviews'
import { ShopperProduct } from '../../../../models/Products'
import StarRating from '../StarRating/StarRating'
import { formatDateToDDMMYYYY } from '../../../utils/formatDate'
import { addDemoUserReview } from '../../../services/reviews'
import { getUserFullNameByUserName } from '../../../services/users'

interface ProductReviewsProps {
  product: ShopperProduct
  reviews: ProductPageDisplayReview[]
  updateAverageRating: () => void
  isEligable: boolean
  refetchCanDemoUserAddReview: () => void
  updateDisplayReviews: () => void
}

function ViewProductReviews({
  product,
  reviews,
  updateAverageRating,
  isEligable,
  refetchCanDemoUserAddReview,
  updateDisplayReviews,
}: ProductReviewsProps) {
  const [isAddingReview, setIsAddingReview] = useState(false)
  const [reviewDescription, setReviewDescription] = useState('')
  const [reviewRating, setReviewRating] = useState(3)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('')
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [errorMessage])

  const addReviewMutation = useMutation(
    async (newReview: CreateReview) => addDemoUserReview(newReview),
    {
      onSuccess: () => {
        updateAverageRating()
        refetchCanDemoUserAddReview()
        updateDisplayReviews()
        setErrorMessage('')
      },
      onError: (error) => {
        console.error('An error occurred:', error)
        setErrorMessage('An error occurred while submitting the review.')
      },
    }
  )

  const handleAddReviewClick = () => {
    if (isEligable) {
      setIsAddingReview(true)
    } else {
      setErrorMessage("You've already added a review for this product")
    }
  }

  const handleCancelClick = () => {
    setIsAddingReview(false)
    setReviewDescription('')
    setReviewRating(3)
    setErrorMessage('')
  }

  const handleIncrementRating = () => {
    if (reviewRating < 5) setReviewRating(reviewRating + 0.5)
  }

  const handleDecrementRating = () => {
    if (reviewRating > 0.5) setReviewRating(reviewRating - 0.5)
  }

  const handleSubmitReview = () => {
    if (reviewDescription.trim() === '') {
      setErrorMessage('Please write a review before submitting.')
      return
    }

    const newReview = {
      productId: product.id,
      description: reviewDescription,
      rating: reviewRating,
    }

    addReviewMutation.mutate(newReview)
    setReviewDescription('')
    setReviewRating(3)
    setIsAddingReview(false)
  }

  const reviewsWithFullNames = useMemo(() => {
    return reviews.map((review) => ({
      ...review,
      fullName: getUserFullNameByUserName(review.userName),
    }))
  }, [reviews])

  return (
    <div
      className="flex flex-col items-center max-w-5xl"
      style={{ marginTop: '40px' }}
    >
      <div
        className="flex flex-row items-center max-w-5xl"
        style={{ marginBottom: '20px' }}
      >
        {reviews.length === 0 ? (
          <h2 className="text-xl font-normal mr-2 text-gray-500">
            No reviews yet
          </h2>
        ) : (
          <>
            <h2 className="text-3xl font-bold mr-2">{product.averageRating}</h2>
            <StarRating rating={product.averageRating} size={2} />
          </>
        )}
      </div>

      {reviews.length > 0 &&
        reviewsWithFullNames.map((review) => (
          <div
            key={review.userName}
            className="flex flex-col border border-black rounded"
            style={{ marginBottom: '30px', padding: '10px', width: '400px' }}
          >
            <div
              className="flex flex-row justify-between font-bold"
              style={{ marginBottom: '5px' }}
            >
              <h2>{review.fullName}</h2>
              <h2>{formatDateToDDMMYYYY(review.createdAt)}</h2>
            </div>
            <p style={{ marginBottom: '20px' }}>{review.description}</p>
            <div className="flex">
              <StarRating rating={review.rating} size={1} />
            </div>
          </div>
        ))}

      {isAddingReview ? (
        <div className="flex flex-col" style={{ width: '400px' }}>
          <textarea
            onChange={(e) => setReviewDescription(e.target.value)}
            placeholder="Write your review here..."
            className="min-w-full max-w-2xl p-4 mt-2 bg-white border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y transition duration-150 ease-in-out"
            rows={5}
          />
          <div className="flex flex-col items-center">
            <div>
              <button
                onClick={handleDecrementRating}
                className="bg-red-500 hover:bg-red-700 text-white font-bold px-3 py-1 mt-2 rounded-full w-12 text-center"
                disabled={reviewRating <= 0.5}
              >
                -
              </button>
              <div className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-2 ml-2 mr-2 w-12 text-center">
                {reviewRating}
              </div>
              <button
                onClick={handleIncrementRating}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 py-1 mt-2 rounded-full  w-12 text-center"
                disabled={reviewRating >= 5}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4 mt-4">
            <button
              onClick={handleSubmitReview}
              disabled={reviewDescription.trim() === ''}
              className={`${
                reviewDescription.trim() === ''
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-700'
              } text-white font-bold py-2 px-4 w-128 rounded-full`}
            >
              Submit
            </button>
            <button
              onClick={handleCancelClick}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 w-128 rounded-full"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleAddReviewClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-128 rounded-full mt-4"
        >
          Add review
        </button>
      )}
      <p
        className={`text-red-500 ${
          errorMessage ? 'visible' : 'invisible'
        } mt-4`}
      >
        {errorMessage || 'Placeholder for error message'}
      </p>
    </div>
  )
}

export default ViewProductReviews
