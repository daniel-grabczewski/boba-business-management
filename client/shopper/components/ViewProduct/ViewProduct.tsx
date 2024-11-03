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
  const [isHeartHovered, setIsHeartHovered] = useState(false)

  const cartMutation = useMutation(
    async (productId: number) => addItemToCartByProductId(productId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getAvailableStockByProductId'),
          queryClient.invalidateQueries('getDisplayCartItems'),
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
    <div className="flex flex-col sm:flex-row items-center mx-8 md:w-4/6 xl:w-4/6">
      <div className="w-full p-4 sm:w-1/2 mb-10 lg:mb-0 overflow-hidden flex justify-center">
        <div
          style={{
            marginLeft: '-5em',
            marginRight: '-3em',
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md xl:max-w-lg object-contain mx-auto"
          />
        </div>
      </div>
      <div className="w-full lg:w-1/2 lg:ml-4">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-2xl lg:text-3xl font-bold max-w-xs">
            {product.name}
          </h1>
          <div className="relative group">
            <button
              onClick={handleWishlistClick}
              onMouseEnter={() => setIsHeartHovered(true)}
              onMouseLeave={() => setIsHeartHovered(false)}
              className="flex items-center p-1"
            >
              <FontAwesomeIcon
                icon={wishlistStatus ? solidHeart : regularHeart}
                className={`transition-colors duration-300 ${
                  wishlistStatus
                    ? 'text-red-500'
                    : 'text-black hover:text-red-500'
                }`}
                style={{ fontSize: '1.8rem' }}
              />
            </button>

            {isHeartHovered && (
              <div className="absolute right-0 -top-7 bg-gray-700 text-white text-xs px-1 py-1 rounded opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                {wishlistStatus ? 'Remove from wishlist' : 'Add to wishlist'}
              </div>
            )}
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-2">
          {formatCurrency(product.price)}
        </h2>
        <div className="flex items-center mb-4">
          {averageRating === 0 ? (
            <p className="text-gray-500">No reviews yet</p>
          ) : (
            <>
              <StarRating rating={averageRating} size={1} />
              <p className="ml-2">{averageRating}</p>
            </>
          )}
        </div>
        <p className="mt-4 pr-2 mb-4">{product.description}</p>
        <div className="flex flex-col lg:flex-row items-start lg:items-center mt-4">
          <button
            className={`text-white font-bold py-2 px-4 rounded transition-all duration-300 ${
              availableStock === 0 ? `bg-gray-400` : `${buttonColor}`
            }`}
            onClick={handleAddToCart}
            disabled={
              availableStock === 0 || isButtonDisabled || cartMutation.isLoading
            }
          >
            {buttonText}
          </button>
          <p className="text-red-500 font-semibold mt-2 lg:mt-0 lg:ml-6">
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
