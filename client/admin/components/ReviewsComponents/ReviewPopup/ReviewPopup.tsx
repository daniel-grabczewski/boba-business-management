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

interface ReviewPopupProps {
  reviewId: number
  closeReviewPopup: () => void
}

const ReviewPopup = ({ reviewId, closeReviewPopup }: ReviewPopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null)

  const navigate = useNavigate()
  const goTo = (link: string) => {
    navigate(link)
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
            className="bg-white p-5 rounded-lg flex flex-col justify-between w-4/5 max-w-lg"
            style={{ maxHeight: '500px' }}
          >
            <div style={{ marginBottom: '-55px' }}>
              <div className="flex justify-between mt-2">
                <div>
                  <h2 className="font-bold text-lg">
                    {review.reviewerUserName}
                  </h2>
                </div>
                <div>
                  <p>{formatDateToDDMMYYYY(review.reviewCreatedAt)}</p>
                  <p>{format24HourTo12Hour(review.reviewCreatedAt)}</p>
                </div>
              </div>
              <div className="flex mt-4 gap-4">
                <div
                  className="w-1/4 cursor-pointer"
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
                    style={{
                      maxHeight: '125px',
                      maxWidth: '118px',
                      marginTop: '11px',
                    }}
                    src={review.productImage}
                    alt={review.productName}
                  />
                </div>
                <div className="flex flex-col justify">
                  <div>
                    <div style={{ maxWidth: '320px' }}>
                      <div className="flex gap-4 mt-4">
                        <p className="font-semibold">{`User's Rating:`}</p>
                        <StarRating rating={review.reviewRating} size={1} />
                        <p className="font-semibold">({review.reviewRating})</p>
                      </div>

                      <p>{review.reviewDescription}</p>
                    </div>
                  </div>
                  <div>
                    <button
                      className="font-semibold text-blue-700 hover:text-gray-700 mb-2 mt-8 transition-all duration-300"
                      onClick={() => {
                        goTo(
                          `/shop/${getProductIdByProductName(
                            review.productName
                          )}`
                        )
                        window.scrollTo(0, 0)
                      }}
                    >
                      Go to store page
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <hr
              className="border-t border-gray-300"
              style={{ marginTop: '90px' }}
            />
            <div className="flex justify-between items-center">
              <div className="mt-3">
                <ToggleSwitch
                  checked={review.reviewIsEnabled}
                  label={review.reviewIsEnabled ? 'Enabled' : 'Disabled'}
                  scale={1.45}
                  onChange={onToggle}
                />
              </div>
              <button
                onClick={closeReviewPopup}
                className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-700 mb-2 mt-8 transition-all duration-300"
              >
                Back to reviews
              </button>
            </div>
          </div>
          <div></div>
        </div>
      )}
    </>
  )
}

export default ReviewPopup
