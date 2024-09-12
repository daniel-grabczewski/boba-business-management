import { useState, useMemo, useEffect, useRef } from 'react'
import { useMutation } from 'react-query'
import {
  CreateReview,
  ProductPageDisplayReview,
} from '../../../../models/Reviews'
import { ShopperProduct } from '../../../../models/Products'
import StarRating from '../StarRating/StarRating'
import SetStarRating from '../../../UI/SetStarRating'
import { formatDateToDDMMYYYY } from '../../../utils/formatDate'
import { addDemoUserReview } from '../../../services/reviews'
import { getUserFullNameByUserName } from '../../../services/users'

interface ProductReviewsProps {
  product: ShopperProduct
  reviews: ProductPageDisplayReview[]
  demoUserName: string
  updateAverageRating: () => void
  isEligable: boolean
  isEnabled: boolean
  refetchCanDemoUserAddReview: () => void
  updateDisplayReviews: () => void
}

function ViewProductReviews({
  product,
  reviews,
  demoUserName,
  updateAverageRating,
  isEligable,
  refetchCanDemoUserAddReview,
  updateDisplayReviews,
}: ProductReviewsProps) {
  const [isAddingReview, setIsAddingReview] = useState(false)
  const [reviewDescription, setReviewDescription] = useState('')
  const [reviewRating, setReviewRating] = useState(2.5) // Default rating to 2.5
  const [errorMessage, setErrorMessage] = useState('')
  const reviewsContainerRef = useRef<HTMLDivElement>(null)

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
        if (reviewsContainerRef.current) {
          reviewsContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
        }
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
    setReviewRating(2.5) // Reset rating to default
    setErrorMessage('')
  }

  const handleRatingChange = (rating: number) => {
    setReviewRating(rating)
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
    setReviewRating(2.5) // Reset rating to default
    setIsAddingReview(false)
  }

  const reviewsWithFullNames = useMemo(() => {
    return reviews.map((review) => ({
      ...review,
      fullName: getUserFullNameByUserName(review.userName),
    }))
  }, [reviews])

  return (
    <>
      <div className="flex flex-col items-center max-w-5xl p-4">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full mb-4">
          {reviews.length === 0 ? (
            <h2 className="text-lg md:text-xl font-normal text-gray-500 mb-4 md:mb-0">
              No reviews yet
            </h2>
          ) : (
            <div className="flex flex-row items-center">
              <StarRating rating={product.averageRating} size={2} />
              <h2 className="text-xl md:text-3xl font-bold ml-2">
                {product.averageRating}
              </h2>
            </div>
          )}
        </div>

        {reviews.length > 0 && (
          <div
            ref={reviewsContainerRef} // Attach the ref to the container
            className="overflow-y-auto w-full md:w-[400px] max-h-[400px] p-2"
          >
            {[...reviewsWithFullNames].reverse().map((review) =>
              review.userName !== demoUserName && !review.isEnabled ? (
                <div key={review.userName}></div>
              ) : (
                <div
                  key={review.userName}
                  className="flex flex-col border border-black rounded p-4 mb-4"
                >
                  <div className="flex justify-between font-bold mb-2">
                    <h2>{review.fullName}</h2>
                    <h2>{formatDateToDDMMYYYY(review.createdAt)}</h2>
                  </div>
                  <p className="mb-4">{review.description}</p>
                  <div className="flex justify-between">
                    <StarRating rating={review.rating} size={1} />
                    {review.isEnabled === false ? (
                      <div className="text-red-500 text-xs">
                        <p>Your review has been disabled by an admin.</p>
                        <p>It is not visible to other shoppers.</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {isAddingReview ? (
        <div className="flex flex-col w-full md:w-[400px] mt-4">
          <textarea
            onChange={(e) => setReviewDescription(e.target.value)}
            placeholder="Write your review here..."
            className="w-full p-4 bg-white border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y transition duration-150 ease-in-out"
            rows={5}
          />
          <div className="flex justify-center mt-4">
            <SetStarRating
              initialRating={2.5}
              onRatingChange={handleRatingChange}
            />
            <div className="ml-4 text-3xl font-bold">{reviewRating}</div>
          </div>
          <div className="flex flex-col items-center space-y-4 mt-4">
            <button
              onClick={handleSubmitReview}
              disabled={reviewDescription.trim() === ''}
              className={`${
                reviewDescription.trim() === ''
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-700'
              } text-white font-bold py-2 px-4 rounded transition-all duration-300 w-full`}
            >
              Submit
            </button>
            <button
              onClick={handleCancelClick}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleAddReviewClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded transition-all duration-300"
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
    </>
  )
}

export default ViewProductReviews
