import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { getProductByIdShopper } from '../../../services/products'
import {
  getReviewsByProductId,
  canDemoUserAddReview,
} from '../../../services/reviews'
import ViewProduct from '../../components/ViewProduct/ViewProduct'
import LoadError from '../../components/LoadError/LoadError'
import ViewProductReviews from '../../components/ViewProductReviews/ViewProductReviews'
import { isProductInWishlistItemsByProductId } from '../../../services/wishlist'
import { useEffect, useState } from 'react'

const ProductPage = () => {
  const params = useParams()
  const id = Number(params.id)

  // Scroll to top when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const {
    data: product,
    status: statusProducts,
    refetch: refetchGetProductByIdShopper,
  } = useQuery(['getProductByIdShopper', id], async () =>
    getProductByIdShopper(id)
  )

  const { data: isEligable = false, refetch: refetchCanDemoUserAddReview } =
    useQuery(['canDemoUserAddReview', id], async () => 
      canDemoUserAddReview(id)
    )

  const {
    data: reviews = [],
    status: statusReviews,
    refetch: refetchGetReviewsByProductId,
  } = useQuery(['getReviewsByProductId', id], async () =>
    getReviewsByProductId(id)
  )

  const {
    data: wishlistStatus = false,
    refetch: refetchIsProductInWishlistItemsByProductId,
    status: statusWishlist,
  } = useQuery(['isProductInWishlistItemsByProductId', id], async () =>
    isProductInWishlistItemsByProductId(id)
  )

  const [averageRating, setAverageRating] = useState(
    product?.averageRating || 0
  )
  const [displayReviews, setDisplayReviews] = useState(reviews || [])

  useEffect(() => {
    if (product) {
      setAverageRating(product.averageRating)
    }
  }, [product])

  const updateAverageRating = async () => {
    const updatedProduct = await refetchGetProductByIdShopper()
    if (updatedProduct?.data?.averageRating) {
      setAverageRating(updatedProduct.data.averageRating)
    }
  }

  useEffect(() => {
    if (reviews) {
      setDisplayReviews(reviews)
    }
  }, [reviews])

  const updateDisplayReviews = async () => {
    const updatedDisplayReviews = await refetchGetReviewsByProductId()
    if (updatedDisplayReviews.data) {
      setDisplayReviews(updatedDisplayReviews.data)
    }
  }

  return (
    <>
      <LoadError status={[statusProducts, statusReviews, statusWishlist]} />
      {product && reviews && (
        <div
          className="flex flex-col items-center w-full"
          style={{ marginTop: '100px', marginBottom: '150px' }}
        >
          <ViewProduct
            product={product}
            wishlistStatus={wishlistStatus}
            refetchIsProductInWishlistItemsByProductId={
              refetchIsProductInWishlistItemsByProductId
            }
            averageRating={averageRating}
          />
          <ViewProductReviews
            product={product}
            reviews={displayReviews}
            updateAverageRating={updateAverageRating}
            isEligable={isEligable}
            refetchCanDemoUserAddReview={refetchCanDemoUserAddReview}
            updateDisplayReviews={updateDisplayReviews}
          />
        </div>
      )}
    </>
  )
}

export default ProductPage
