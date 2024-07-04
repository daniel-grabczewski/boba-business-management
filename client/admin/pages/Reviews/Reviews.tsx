import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { getAllAdminDisplayReviews, getAdminDisplayReviewById } from '../../../services/reviews'
import LoadError from '../../../shopper/components/LoadError/LoadError'
import { AdminDisplayReview } from '../../../../models/Reviews'
import ReviewPopup from '../../components/ReviewsComponents/ReviewPopup/ReviewPopup'
import ReviewSortingControls from '../../components/ReviewsComponents/ReviewSortingControls/ReviewSortingControls'
import ReviewColumnTitles from '../../components/ReviewsComponents/ReviewColumnTitles/ReviewColumnTitles'
import DisplayCurrentReviews from '../../components/ReviewsComponents/DisplayCurrentReviews/DisplayCurrentReviews'

const Reviews = () => {
  const [selectedReview, setSelectedReview] = useState<AdminDisplayReview | undefined>(undefined)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('Newest first')
  const [currentPage, setCurrentPage] = useState(1)
  const reviewsPerPage = 20

  const {
    data: reviews,
    status: statusReviews,
    refetch,
  } = useQuery(['getReviews'], async () => {
    const fetchedReviews: AdminDisplayReview[] =  getAllAdminDisplayReviews()
    return fetchedReviews
  })

  const fetchAndShowReviewDetails = async (reviewId: number) => {
    const review = getAdminDisplayReviewById(reviewId)
    setSelectedReview(review)
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [search, filter, sort])

  const filteredAndSortedReviews = reviews
    ?.filter((review) => {
      if (filter === 'enabled') return review.reviewIsEnabled
      if (filter === 'disabled') return !review.reviewIsEnabled
      return true
    })
    .filter((review) => {
   
        return review.productName.toLowerCase().includes(search.toLowerCase())
      
    })
    .sort((a, b) => {
      switch (sort) {
        case 'Newest first':
          return (
            new Date(b.reviewCreatedAt).getTime() - new Date(a.reviewCreatedAt).getTime()
          )
        case 'Oldest first':
          return (
            new Date(a.reviewCreatedAt).getTime() - new Date(b.reviewCreatedAt).getTime()
          )
        case 'High to low rating':
          return b.reviewRating - a.reviewRating
        case 'Low to high rating':
          return a.reviewRating - b.reviewRating
        default:
          return 0
      }
    })

  const lastIndex = currentPage * reviewsPerPage
  const firstIndex = lastIndex - reviewsPerPage
  const currentReviews = filteredAndSortedReviews?.slice(firstIndex, lastIndex)
  const totalPages = Math.ceil(
    (filteredAndSortedReviews?.length ?? 0) / reviewsPerPage
  )

  const closeReviewPopup = () => {
    setSelectedReview(undefined)
    refetch()
  }

  return (
    <>
      {selectedReview && (
        <ReviewPopup
          reviewId={selectedReview.reviewId}
          closeReviewPopup={closeReviewPopup}
        />
      )}
      <LoadError status={statusReviews} />
      {reviews && currentReviews && filteredAndSortedReviews && (
        <div className="flex justify-center">
          <div className="p-4" style={{ width: '1000px' }}>
            <ReviewSortingControls
              search={search}
              setSearch={setSearch}
              filter={filter}
              setFilter={setFilter}
              sort={sort}
              setSort={setSort}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              totalReviews={filteredAndSortedReviews.length}
            />

            {/* TABLE */}
            <div className="divTable bg-white mt-4 border border-gray-300">
              <ReviewColumnTitles />
              <DisplayCurrentReviews
                currentReviews={currentReviews}
                fetchAndShowReviewDetails={fetchAndShowReviewDetails}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Reviews
