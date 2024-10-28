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
    <div className="flex flex-col sm:flex-row items-center p-6 w-full lg:w-[1100px]">
      <div className="w-full p-4 sm:w-1/2 mb-10 lg:mb-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain mx-auto"
        />
      </div>
      <div className="w-full lg:w-1/2 lg:ml-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl lg:text-3xl font-bold whitespace-nowrap">
            {product.name}
          </h1>
          <div className="flex items-center ml-4">
            <button onClick={handleWishlistClick} className="flex items-center">
              <FontAwesomeIcon
                icon={wishlistStatus ? solidHeart : regularHeart}
                className={`${wishlistStatus ? 'text-red-500' : 'text-black'} ${
                  !wishlistStatus && 'hover:text-red-500'
                } transition-colors duration-300`}
                style={{ fontSize: '1.8rem' }}
              />
              <p className="ml-1 text-[10px] sm:text-xs md:text-sm">
                {wishlistStatus ? 'Remove from wishlist' : 'Add to wishlist'}
              </p>
            </button>
          </div>
        </div>
        <h2 className="text-xl font-semibold">
          {formatCurrency(product.price)}
        </h2>
        <div className="flex items-center">
          {averageRating === 0 ? (
            <p className="text-gray-500">No reviews yet</p>
          ) : (
            <>
              <StarRating rating={averageRating} size={1} />
              <p className="ml-2">{averageRating}</p>
            </>
          )}
        </div>

        <p className="mt-4">{product.description}</p>
        <div className="flex flex-col lg:flex-row items-start lg:items-center mt-4">
          <button
            className={`text-white font-bold py-2 px-4 mt-2 rounded transition-all duration-300 ${
              availableStock === 0 ? `bg-gray-400 ` : `${buttonColor}`
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
