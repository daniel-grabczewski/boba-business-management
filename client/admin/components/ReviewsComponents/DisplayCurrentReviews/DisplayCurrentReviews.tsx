import { AdminDisplayReview } from '../../../../../models/Reviews'
import {
  format24HourTo12Hour,
  formatDateToDDMMYYYY,
  formatRelativeDate,
} from '../../../../utils/formatDate'

interface DisplayCurrentReviewsProps {
  getPaginatedReviews: () => AdminDisplayReview[]
  handleSelectReviewId: (reviewId: number) => void
}

const DisplayCurrentReviews = ({
  getPaginatedReviews,
  handleSelectReviewId,
}: DisplayCurrentReviewsProps) => {
  return (
    <>
      {getPaginatedReviews().length === 0 ? (
        <p className="text-center mt-4 font-semibold">No reviews found</p>
      ) : (
        <div className="bg-white mt-4 mb-8 border border-gray-300">
          {/* Table Header (Visible only on larger screens) */}
          <div className="hidden md:flex bg-gray-300 text-gray-700 uppercase text-sm leading-normal border-b border-gray-300">
            <div className="flex-1 py-4 px-4 border-r border-gray-300 text-center">
              Reviewer Username
            </div>
            <div className="flex-1 py-4 px-4 border-r border-gray-300 text-center">
              Reviewed Product
            </div>
            <div className="flex-1 py-4 px-4 border-r border-gray-300 text-center">
              Review Rating
            </div>
            <div className="flex-1 py-4 px-4 border-r border-gray-300 text-center">
              Status
            </div>
            <div className="flex-1 py-4 px-4 text-center">Date Posted</div>
          </div>

          {/* Table Body */}
          <div className="text-gray-600 text-sm font-light">
            {getPaginatedReviews().map((review) => (
              <div
                key={review.reviewId}
                className={`border-b border-gray-300 hover:bg-gray-100 cursor-pointer flex flex-col md:flex-row w-full`}
                onClick={() => handleSelectReviewId(review.reviewId)}
                style={{ minHeight: '80px' }}
              >
                {/* Mobile Version (Stacked Info) */}
                <div className="block md:hidden p-4 border-b">
                  <div className="mb-2">
                    <strong>Reviewer Username: </strong>
                    {review.reviewerUserName}
                  </div>
                  <div className="mb-2">
                    <strong>Reviewed Product: </strong>
                    <span className="truncate">{review.productName}</span>
                  </div>
                  <div className="mb-2">
                    <strong>Review Rating: </strong> {review.reviewRating}
                  </div>
                  <div
                    className={`mb-2 p-2 rounded text-center ${
                      review.reviewIsEnabled ? 'bg-green-200' : 'bg-red-300'
                    }`}
                  >
                    <strong>Status:</strong>{' '}
                    {review.reviewIsEnabled ? 'Enabled' : 'Disabled'}
                  </div>
                  <div>
                    <strong>Date Posted: </strong>
                    <span
                      className={
                        formatRelativeDate(review.reviewCreatedAt) === 'Today'
                          ? 'font-semibold'
                          : ''
                      }
                    >
                      {formatRelativeDate(review.reviewCreatedAt) === 'Today'
                        ? 'Today'
                        : formatDateToDDMMYYYY(review.reviewCreatedAt)}{' '}
                      {format24HourTo12Hour(review.reviewCreatedAt)}
                    </span>
                  </div>
                </div>

                {/* Desktop Version (Table) */}

                {/* Username Column */}
                <div className="hidden md:flex flex-1 py-4 px-6 border-r border-gray-300 text-left items-center truncate">
                  {review.reviewerUserName}
                </div>
                {/* Product Name Column */}
                <div className="flex-1 py-8 px-2 md:px-4 lg:px-6 border-r border-gray-300 items-center text-left md:truncate">
                  {review.productName}
                </div>

                {/* Review Rating Column */}
                <div className="hidden md:flex flex-1 py-4 px-2 md:px-4 lg:px-6 border-r border-gray-300 justify-center items-center text-center">
                  {review.reviewRating}
                </div>

                <div
                  className={`hidden md:flex flex-1 py-4 px-2 md:px-4 lg:px-6 border-r border-gray-300 ${
                    review.reviewIsEnabled ? 'bg-green-200' : 'bg-red-300'
                  } justify-center items-center text-center`}
                >
                  {review.reviewIsEnabled ? 'Enabled' : 'Disabled'}
                </div>

                <div className="hidden md:flex flex-1 py-4 px-2 md:px-4 lg:px-6 justify-center items-center text-center">
                  <span
                    className={
                      formatRelativeDate(review.reviewCreatedAt) === 'Today'
                        ? 'font-semibold'
                        : ''
                    }
                  >
                    {formatRelativeDate(review.reviewCreatedAt) === 'Today'
                      ? formatRelativeDate(review.reviewCreatedAt)
                      : formatDateToDDMMYYYY(review.reviewCreatedAt)}{' '}
                    {format24HourTo12Hour(review.reviewCreatedAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default DisplayCurrentReviews
