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
import { ProductPageDisplayReview } from '../../../../models/Reviews'
import { ShopperProduct } from '../../../../models/Products'
import { isProductInWishlistItemsByProductId } from '../../../services/wishlist'
import { useEffect, useState } from 'react'

const ProductPage = () => {
  const params = useParams()
  const id = Number(params.id)

  const {
    data: product,
    status: statusProducts,
    refetch: refetchProduct,
  } = useQuery(['getProduct', id], async () => {
    const fetchedProduct: ShopperProduct | undefined = getProductByIdShopper(id)
    return fetchedProduct
  })

  const { data: isEligable = false, refetch: refetchCanDemoUserAddReview } =
    useQuery(['canDemoUserAddReview', id], async () => {
      return canDemoUserAddReview(id)
    })

  const {
    data: reviews = [],
    status: statusReviews,
    refetch: refetchReviews,
  } = useQuery(['getReviews', id], async () => {
    const fetchedReviews: ProductPageDisplayReview[] = getReviewsByProductId(id)
    return fetchedReviews
  })

  const {
    data: wishlistStatus = false,
    refetch: refetchWishlistProductStatus,
    status: statusWishlist,
  } = useQuery(['getWishlistStatus', id], async () => {
    try {
      const wishlistStatus: boolean = isProductInWishlistItemsByProductId(id)
      return wishlistStatus
    } catch (error) {
      console.error('An error occurred:', error)
    }
  })

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
    const updatedProduct = await refetchProduct()
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
    const updatedDisplayReviews = await refetchReviews()
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
            refetchWishlistProductStatus={refetchWishlistProductStatus}
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
