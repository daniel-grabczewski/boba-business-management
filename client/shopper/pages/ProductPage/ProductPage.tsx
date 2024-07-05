import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { getProductByIdShopper } from '../../../services/products'
import { getReviewsByProductId } from '../../../services/reviews'
import ViewProduct from '../../components/ViewProduct/ViewProduct'
import LoadError from '../../components/LoadError/LoadError'
import ViewProductReviews from '../../components/ViewProductReviews/ViewProductReviews'
import { ProductPageDisplayReview } from '../../../../models/Reviews'
import { isProductInWishlistItemsByProductId } from '../../../services/wishlist'
import { useEffect, useState } from 'react'

const ProductPage = () => {
  const params = useParams()
  const id = Number(params.id)

  const { data: product, status: statusProductS, refetch : refetchProduct } = useQuery(
    ['getProduct', id],
    async () => {
      return getProductByIdShopper(id)
    }
  )

  const {
    data: reviews,
    status: statusReviews,
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
      const wishlistStatus: boolean = isProductInWishlistItemsByProductId(
        id,
      )
      return wishlistStatus
    } catch (error) {
      console.error('An error occurred:', error)
    }
  })

  
  const [averageRating, setAverageRating] = useState(product?.averageRating || 0)

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

  return (
    <>
      <LoadError status={[statusProductS, statusReviews, statusWishlist]} />
      {product && reviews && (
        <div
          className="flex flex-col items-center w-full"
          style={{ marginTop: '100px', marginBottom: '150px' }}
        >
          <ViewProduct
            product={product}
            wishlistStatus={wishlistStatus}
            refetchWishlistProductStatus={refetchWishlistProductStatus}
            averageRating = {averageRating}
          />
          <ViewProductReviews
            product={product}
            reviews={reviews}
            updateAverageRating={updateAverageRating}
          />
        </div>
      )}
    </>
  )
}

export default ProductPage
