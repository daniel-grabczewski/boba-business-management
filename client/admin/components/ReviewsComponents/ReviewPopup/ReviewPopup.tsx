import { useEffect, useRef } from 'react'
import { useQuery, useMutation } from 'react-query'
import StarRating from '../../../../shopper/components/StarRating/StarRating'
import {
  format24HourTo12Hour,
  formatDateToDDMMYYYY,
} from '../../../../utils/formatDate'
import {
  getAdminDisplayReviewById,
  updateReviewStatusById,
} from '../../../../services/reviews'
import LoadError from '../../../../shopper/components/LoadError/LoadError'
import ToggleSwitch from '../../../../UI/ToggleSwitch'
import { useNavigate } from 'react-router-dom'
import { getProductIdByProductName } from '../../../../services/products'
import { baseURL } from '../../../../../baseUrl'

interface ReviewPopupProps {
  reviewId: number
  closeReviewPopup: () => void
}

const ReviewPopup = ({ reviewId, closeReviewPopup }: ReviewPopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null)

  const navigate = useNavigate()
  const goTo = (link: string) => {
    navigate(`${baseURL}${link}`)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        closeReviewPopup()
      }
    }

    window.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [closeReviewPopup])

  const {
    data: review,
    status,
    refetch: refetchGetAdminDisplayReviewById,
  } = useQuery(
    ['getAdminDisplayReviewById', reviewId],
    () => getAdminDisplayReviewById(reviewId),
    {
      refetchOnWindowFocus: false,
    }
  )

  const mutation = useMutation(
    async (data: { reviewId: number; isEnabled: boolean }) => {
      return updateReviewStatusById(data.reviewId, data.isEnabled)
    },
    {
      onSuccess: () => {
        refetchGetAdminDisplayReviewById()
      },
    }
  )

  const onToggle = async (isEnabled: boolean) => {
    if (review) {
      const reviewId = review.reviewId
      mutation.mutate({ reviewId, isEnabled })
    }
  }

  return (
    <>
      <LoadError status={status} />
      {status === 'success' && review && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div
            ref={popupRef}
            className="bg-white p-5 rounded-lg flex flex-col justify-between w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 max-w-5xl max-h-[90vh] overflow-auto"
          >
            <div>
              {/* Header with Username and Date */}
              <div className="flex justify-between items-start mt-2">
                <div>
                  <h2 className="font-bold text-lg">
                    {review.reviewerUserName}
                  </h2>
                </div>
                <div className="text-right">
                  <p>{formatDateToDDMMYYYY(review.reviewCreatedAt)}</p>
                  <p>{format24HourTo12Hour(review.reviewCreatedAt)}</p>
                </div>
              </div>

              {/* Review Content */}
              <div className="flex mt-4 gap-4">
                {/* Product Image */}
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    goTo(
                      `/admin/edit/${getProductIdByProductName(
                        review.productName
                      )}`
                    )
                    window.scrollTo(0, 0)
                  }}
                >
                  <img
                    className="object-contain mx-auto mt-4"
                    src={review.productImage}
                    alt={review.productName}
                    style={{
                      height: '160px',
                      width: '160px',
                    }}
                  />
                </div>

                {/* Review Text and Rating */}
                <div className="flex flex-col justify-between w-full">
                  <div>
                    <h1 className="font-semibold text-2xl">
                      {review.productName}
                    </h1>
                    <div className="flex gap-4 items-center mt-2">
                      <p className="font-semibold">User Rating:</p>
                      <StarRating rating={review.reviewRating} size={1} />
                      <p className="font-semibold">({review.reviewRating})</p>
                    </div>

                    <p className="mt-4 text-gray-700">
                      {review.reviewDescription}
                    </p>
                  </div>

                  <button
                    className="text-blue-600 hover:text-blue-800 mt-4 font-semibold"
                    onClick={() => {
                      goTo(
                        `/shop/${getProductIdByProductName(review.productName)}`
                      )
                      window.scrollTo(0, 0)
                    }}
                  >
                    Go to store page
                  </button>
                </div>
              </div>
            </div>

            <hr className="border-t border-gray-300 my-4" />

            {/* Toggle Switch and Close Button */}
            <div className="flex justify-between items-center">
              <ToggleSwitch
                checked={review.reviewIsEnabled}
                label={review.reviewIsEnabled ? 'Enabled' : 'Disabled'}
                scale={1.45}
                onChange={onToggle}
              />
              <button
                onClick={closeReviewPopup}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 transition duration-300"
              >
                Back to reviews
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ReviewPopup
