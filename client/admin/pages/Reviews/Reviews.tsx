import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import {
  getAllAdminDisplayReviews,
  getAdminDisplayReviewById,
} from '../../../services/reviews'
import LoadError from '../../../shopper/components/LoadError/LoadError'
import { AdminDisplayReview } from '../../../../models/Reviews'
import ReviewPopup from '../../components/ReviewsComponents/ReviewPopup/ReviewPopup'
import ReviewSortingControls from '../../components/ReviewsComponents/ReviewSortingControls/ReviewSortingControls'
import ReviewColumnTitles from '../../components/ReviewsComponents/ReviewColumnTitles/ReviewColumnTitles'
import DisplayCurrentReviews from '../../components/ReviewsComponents/DisplayCurrentReviews/DisplayCurrentReviews'
import { useNavigate } from 'react-router-dom'
import {
  changeFilter,
  changePage,
  changeSort,
} from '../../../utils/queryHelpers'

const Reviews = () => {
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)

  const initialPage = parseInt(queryParams.get('page') || '1')

  const initialSort = queryParams.get('sort') || 'newest-first'

  const initialFilter = queryParams.get('filter') || 'all'

  const [selectedReview, setSelectedReview] = useState<
    AdminDisplayReview | undefined
  >(undefined)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState(initialFilter)
  const [sort, setSort] = useState(initialSort)
  const [page, setPage] = useState(initialPage)
  const reviewsPerPage = 10

  const {
    data: reviews,
    status: reviewStatus,
    refetch: refetchGetAllAdminDisplayReviews,
  } = useQuery(['getAllAdminDisplayReviews'], async () =>
    getAllAdminDisplayReviews()
  )

  const setSelectedReviewById = async (id: number) => {
    const review = getAdminDisplayReviewById(id)
    setSelectedReview(review)
  }

  const handleChangeSearch = (search: string) => {
    localStorage.setItem('productSearch', JSON.stringify(search))
    setSearch(search)
  }

  const handleChangeSort = (newSort: string) => {
    changeSort(newSort, setSort, setPage, navigate, location.search)
  }

  const handleChangePage = (newPage: number) => {
    changePage(newPage, setPage, navigate, location.search)
  }

  const handleChangeFilter = (newFilter: string) => {
    changeFilter(newFilter, setFilter, setPage, navigate, location.search)
  }

  useEffect(() => {
    const searchInLocalStorage = localStorage.getItem('productSearch')
    if (searchInLocalStorage) {
      setSearch(JSON.parse(searchInLocalStorage))
    }
  }, [])

  useEffect(() => {
    if (!location.search) {
      setPage(1)
      setFilter('all')
      setSort('getPaginatedReviews')
      handleChangeSearch('')
    }
  }, [location.search])

  const searchedReviews = reviews
    ? reviews.filter(
        (review) =>
          review.productName.toLowerCase().includes(search.toLowerCase()) ||
          review.reviewerUserName.toLowerCase().includes(search.toLowerCase())
      )
    : []

  const filteredReviews = searchedReviews.filter((review) => {
    switch (filter) {
      case 'all':
        return true
      case 'enabled':
        return review.reviewIsEnabled
      case 'disabled':
        return !review.reviewIsEnabled
      default:
        return true
    }
  })

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    const dateA = new Date(a.reviewCreatedAt).getTime()
    const dateB = new Date(b.reviewCreatedAt).getTime()
    switch (sort) {
      case 'newest-first':
        return dateB - dateA
      case 'oldest-first':
        return dateA - dateB
      case 'rating-high-to-low':
        return b.reviewRating - a.reviewRating
      case 'rating-low-to-high':
        return a.reviewRating - b.reviewRating
      default:
        return 0
    }
  })

  const getPaginatedReviews = () => {
    const start = (page - 1) * reviewsPerPage
    const end = start + reviewsPerPage
    return sortedReviews.slice(start, end)
  }

  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage)

  const closeReviewPopup = () => {
    setSelectedReview(undefined)
    refetchGetAllAdminDisplayReviews()
  }

  return (
    <>
      {selectedReview && (
        <ReviewPopup
          reviewId={selectedReview.reviewId}
          closeReviewPopup={closeReviewPopup}
        />
      )}
      <LoadError status={reviewStatus} />
      {reviews && sortedReviews && (
        <>
          {' '}
          <h1 className="text-center text-4xl font-semibold mt-4">Reviews</h1>
          <div className="flex justify-center">
            <div className="p-4" style={{ width: '1000px' }}>
              <ReviewSortingControls
                search={search}
                handleChangeSearch={handleChangeSearch}
                filter={filter}
                handleChangeFilter={handleChangeFilter}
                sort={sort}
                handleChangeSort={handleChangeSort}
                page={page}
                handleChangePage={handleChangePage}
                totalPages={totalPages}
                reviewsCount={sortedReviews.length}
              />

              {/* TABLE */}
              <DisplayCurrentReviews
                getPaginatedReviews={getPaginatedReviews}
                setSelectedReviewById={setSelectedReviewById}
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Reviews
