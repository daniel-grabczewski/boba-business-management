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
          {/* Table Header (Visible only on desktop) */}
          <div className="hidden sm:flex bg-gray-300 text-gray-700 uppercase text-sm leading-normal border-b border-gray-300">
            <div className="w-1/5 py-4 px-6 border-r border-gray-300 whitespace-nowrap">
              Reviewer Username
            </div>
            <div className="w-2/5 py-4 px-6 border-r border-gray-300 whitespace-nowrap">
              Reviewed Product
            </div>
            <div className="w-1/6 py-4 px-6 border-r border-gray-300 text-center whitespace-nowrap">
              Review Rating
            </div>
            <div className="w-1/6 py-4 px-6 border-r border-gray-300 text-center whitespace-nowrap">
              Status
            </div>
            <div className="w-1/6 py-4 px-6 whitespace-nowrap">Date Posted</div>
          </div>

          {/* Table Body */}
          <div className="text-gray-600 text-sm font-light">
            {getPaginatedReviews().map((review) => (
              <div
                key={review.reviewId}
                className={`border-b border-gray-300 hover:bg-gray-100 cursor-pointer flex flex-col sm:flex-row`}
                onClick={() => handleSelectReviewId(review.reviewId)}
                style={{ minHeight: '80px' }}
              >
                {/* Mobile Version (Stacked Info) */}
                <div className="block sm:hidden p-4 border-b">
                  <div className="mb-2 flex justify-between items-center">
                    <strong>Reviewer Username:</strong>
                    <span className="whitespace-nowrap truncate">
                      {review.reviewerUserName}
                    </span>
                  </div>
                  <div className="mb-2">
                    <strong>Reviewed Product:</strong>{' '}
                    <span className="truncate">{review.productName}</span>
                  </div>
                  <div className="mb-2">
                    <strong>Review Rating:</strong> {review.reviewRating}
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
                    <strong>Date Posted:</strong>{' '}
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
                <div className="hidden sm:flex w-full sm:w-1/5 py-4 px-6 sm:border-r border-gray-300 text-left items-center truncate">
                  {review.reviewerUserName}
                </div>

                <div className="hidden sm:flex w-full sm:w-2/5 py-4 px-6 sm:border-r border-gray-300 items-center text-left truncate">
                  {review.productName}
                </div>

                {/* Review Rating Column (Centered) */}
                <div className="hidden sm:flex w-full sm:w-1/6 py-4 px-6 sm:border-r border-gray-300 justify-center items-center text-center">
                  {review.reviewRating}
                </div>

                <div
                  className={`hidden sm:flex w-full sm:w-1/6 py-4 px-6 sm:border-r border-gray-300 ${
                    review.reviewIsEnabled ? 'bg-green-200' : 'bg-red-300'
                  } justify-center items-center text-center`}
                >
                  {review.reviewIsEnabled ? 'Enabled' : 'Disabled'}
                </div>

                <div className="hidden sm:flex w-full sm:w-1/6 py-4 px-6 justify-center items-center text-center">
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
