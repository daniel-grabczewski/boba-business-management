import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import {
  doesSlugExist,
  getProductByIdAdmin,
  getProductIdByDeprecatedSlug,
  getProductIdBySlug,
  getSlugByProductId,
} from '../../../services/products'
import {
  getReviewsByProductId,
  canDemoUserAddReview,
  isDemoUserReviewEnabled,
} from '../../../services/reviews'
import ViewProduct from '../../components/ViewProduct/ViewProduct'
import LoadError from '../../components/LoadError/LoadError'
import ViewProductReviews from '../../components/ViewProductReviews/ViewProductReviews'
import { isProductInWishlistItemsByProductId } from '../../../services/wishlist'
import { useEffect, useState } from 'react'
import { getDemoUserDetails } from '../../../services/users'
import { isNumeric } from '../../../utils/isNumeric'
import ErrorPage from '../ErrorPage/ErrorPage'
import { getAvailableStockByProductId } from '../../../services/cart'
import { baseURL } from '../../../../baseUrl'

const ProductPage = () => {
  const { idOrSlug } = useParams()
  const navigate = useNavigate()
  const [productId, setProductId] = useState(0)

  // Determine and set the product ID on parameter change
  useEffect(() => {
    if (idOrSlug === undefined) {
      return
    }

    if (isNumeric(idOrSlug)) {
      const id = Number(idOrSlug)
      setProductId(id)
      navigate(`${baseURL}/shop/${getSlugByProductId(id)}`, { replace: true })
    } else {
      if (doesSlugExist(idOrSlug)) {
        setProductId(getProductIdBySlug(idOrSlug))
      } else {
        const deprecatedSlugId = getProductIdByDeprecatedSlug(idOrSlug)
        if (deprecatedSlugId) {
          navigate(`${baseURL}/shop/${getSlugByProductId(deprecatedSlugId)}`, {
            replace: true,
          })
          setProductId(deprecatedSlugId)
        } else {
          setProductId(0)
        }
      }
    }
  }, [idOrSlug, navigate])

  // Scroll to top when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const {
    data: product,
    status: statusProducts,
    refetch: refetchGetProductByIdAdmin,
  } = useQuery(['getProductByIdAdmin', productId], async () =>
    getProductByIdAdmin(productId)
  )

  const { data: availableStock } = useQuery(
    ['getAvailableStockByProductId', productId],
    async () => getAvailableStockByProductId(productId)
  )

  const { data: isEligable = false, refetch: refetchCanDemoUserAddReview } =
    useQuery(['canDemoUserAddReview', productId], async () =>
      canDemoUserAddReview(productId)
    )

  const { data: isEnabled } = useQuery(
    ['isDemoUserReviewEnabled', productId],
    async () => {
      isDemoUserReviewEnabled(productId)
    }
  )

  const { data: demoUserName = '' } = useQuery(
    ['getDemoUserDetails', productId],
    async () => {
      const demoUserDetails = getDemoUserDetails()
      if (demoUserDetails) {
        return demoUserDetails.userName
      }
    }
  )

  const {
    data: reviews = [],
    status: statusReviews,
    refetch: refetchGetReviewsByProductId,
  } = useQuery(['getReviewsByProductId', productId], async () =>
    getReviewsByProductId(productId)
  )

  const {
    data: wishlistStatus = false,
    refetch: refetchIsProductInWishlistItemsByProductId,
    status: statusWishlist,
  } = useQuery(['isProductInWishlistItemsByProductId', productId], async () =>
    isProductInWishlistItemsByProductId(productId)
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
    const updatedProduct = await refetchGetProductByIdAdmin()
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
      {product === undefined || availableStock === undefined ? (
        <ErrorPage />
      ) : reviews && product.isEnabled === false ? (
        <ErrorPage
          errorMessage={'Sorry, this product is currently unavailable'}
        />
      ) : (
        <div className="flex flex-col items-center w-full mt-10">
          <ViewProduct
            product={product}
            wishlistStatus={wishlistStatus}
            refetchIsProductInWishlistItemsByProductId={
              refetchIsProductInWishlistItemsByProductId
            }
            averageRating={averageRating}
            availableStock={availableStock}
          />
          <ViewProductReviews
            product={product}
            reviews={displayReviews}
            demoUserName={demoUserName}
            updateAverageRating={updateAverageRating}
            isEligable={isEligable}
            isEnabled={!!isEnabled}
            refetchCanDemoUserAddReview={refetchCanDemoUserAddReview}
            updateDisplayReviews={updateDisplayReviews}
          />
        </div>
      )}
    </>
  )
}

export default ProductPage
