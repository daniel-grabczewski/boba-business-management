import { useState } from 'react'
import { ShopperProduct } from '../../../../models/Products'
import { addItemToCartByProductId } from '../../../services/cart'
import StarRating from '../StarRating/StarRating'
import { useMutation, useQueryClient } from 'react-query'
import {
  addProductToWishlistItemsByProductId,
  deleteWishlistItemByProductId,
} from '../../../services/wishlist'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'
import { formatCurrency } from '../../../utils/formatCurrency'
import { lowStockThreshold } from '../../../data/lowStockThreshold'

interface ViewProductProps {
  product: ShopperProduct
  wishlistStatus: boolean
  refetchIsProductInWishlistItemsByProductId: () => void
  averageRating: number
  availableStock: number
}

function ViewProduct({
  product,
  wishlistStatus,
  refetchIsProductInWishlistItemsByProductId,
  averageRating,
  availableStock,
}: ViewProductProps) {
  const queryClient = useQueryClient()
  const [buttonText, setButtonText] = useState('Add to cart')
  const [buttonColor, setButtonColor] = useState(
    'bg-blue-500 hover:bg-blue-700'
  )
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const [localStock, setLocalStock] = useState(100)

  const cartMutation = useMutation(
    async (productId: number) => addItemToCartByProductId(productId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getAvailableStockByProductId')
        setButtonText('Item added')
        setButtonColor('bg-green-500')
        setIsButtonDisabled(true)
        setTimeout(() => {
          setButtonText('Add to cart')
          setButtonColor('bg-blue-500 hover:bg-blue-700')
          setTimeout(() => {
            setIsButtonDisabled(false)
          }, 200)
        }, 1000)
      },
      onError: (error) => {
        console.error('An error occurred:', error)
      },
    }
  )

  const wishlistMutation = useMutation(
    async () => {
      if (wishlistStatus) {
        return deleteWishlistItemByProductId(product.id)
      } else {
        return addProductToWishlistItemsByProductId(product.id)
      }
    },
    {
      onSuccess: () => refetchIsProductInWishlistItemsByProductId(),
      onError: (error) => {
        console.error('An error occurred:', error)
      },
    }
  )

  const handleAddToCart = () => {
    if (!isButtonDisabled) {
      cartMutation.mutate(product.id)
    }
    setLocalStock(localStock - 1)
  }

  const handleWishlistClick = () => {
    wishlistMutation.mutate()
  }

  return (
    <div
      className="flex items-center "
      style={{ padding: '10px', width: '1000px', maxWidth: '1100px' }}
    >
      <div className="w-1/2 ">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-contain"
          style={{ height: '400px', maxWidth: '400px' }}
        />
      </div>
      <div className="w-1/2 ml-4">
        <div className="flex items-center justify-between">
          <div style={{ width: '320px' }}>
            <h1 className="text-3xl font-bold">{product.name}</h1>
          </div>
          <div>
            <button onClick={handleWishlistClick}>
              <div
                className="flex items-center justify-between"
                style={{ width: '200px', marginTop: '8px' }}
              >
                <div className="flex ">
                  <FontAwesomeIcon
                    icon={wishlistStatus ? solidHeart : regularHeart}
                    className={`${
                      wishlistStatus ? 'text-red-500' : 'text-black'
                    } ${
                      !wishlistStatus && 'hover:text-red-500'
                    } transition-colors duration-300`}
                    style={{ fontSize: '1.875rem', marginLeft: '10px' }}
                  />
                  <p className="ml-2 self-center" style={{}}>
                    {wishlistStatus
                      ? 'Remove from wishlist'
                      : 'Add to wishlist'}
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <h2 className="text-xl font-semibold">
          {formatCurrency(product.price)}
        </h2>
        <div className="flex">
          {averageRating === 0 ? (
            <p className="text-gray-500">No reviews yet</p>
          ) : (
            <>
              <StarRating rating={averageRating} size={1} />
              <p>{averageRating}</p>
            </>
          )}
        </div>

        <p className="mt-8 mb-2" style={{ paddingRight: '30px' }}>
          {product.description}
        </p>
        <div className="flex">
          <button
            className={`text-white font-bold py-2 px-4 mt-2 rounded transition-all duration-300 ${
              availableStock === 0 ? `bg-gray-400 ` : `${buttonColor}`
            }`}
            style={{ maxWidth: '120px', minWidth: '120px' }}
            onClick={handleAddToCart}
            disabled={
              availableStock === 0 || isButtonDisabled || cartMutation.isLoading
            }
          >
            {buttonText}
          </button>
          <p
            style={{ fontSize: '20px', marginLeft: '25px', marginTop: '11px' }}
            className="text-red-500 font-semibold"
          >
            {availableStock === 0
              ? 'Out of stock'
              : availableStock <= lowStockThreshold
              ? `${availableStock} left in stock`
              : ''}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ViewProduct
