import { useState } from 'react'
import { ShopperProduct } from '../../../../models/Products'
import { addItemToCartByProductId } from '../../../services/cart'
import StarRating from '../StarRating/StarRating'
import { useMutation } from 'react-query'
import {
  addProductToWishlistItemsByProductId,
  deleteWishlistItemByProductId,
} from '../../../services/wishlist'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'
import { formatCurrency } from '../../../utils/formatCurrency'

interface ViewProductProps {
  product: ShopperProduct
  wishlistStatus: boolean
  refetchIsProductInWishlistItemsByProductId: () => void
  averageRating: number
}

function ViewProduct({
  product,
  wishlistStatus,
  refetchIsProductInWishlistItemsByProductId,
  averageRating,
}: ViewProductProps) {
  const [buttonText, setButtonText] = useState('Add to cart')
  const [buttonColor, setButtonColor] = useState(
    'bg-blue-500 hover:bg-blue-700'
  )
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const cartMutation = useMutation(
    async (productId: number) => addItemToCartByProductId(productId),
    {
      onSuccess: () => {
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
                className="flex items-center justify-start"
                style={{ width: '200px' }}
              >
                <FontAwesomeIcon
                  icon={wishlistStatus ? solidHeart : regularHeart}
                  className={wishlistStatus ? 'text-red-500' : 'text-black'}
                  style={{ fontSize: '1.875rem', marginLeft: '10px' }}
                />
                <span className="ml-2 self-center">
                  {wishlistStatus ? 'Remove from wishlist' : 'Add to wishlist'}
                </span>
              </div>
            </button>
          </div>
        </div>

        <h2 className="text-xl font-semibold">
          {formatCurrency(product.price)}
        </h2>
        <div className="flex">
          <StarRating rating={averageRating} size={1} />
          <p>{averageRating}</p>
        </div>

        <p className="mt-8 mb-2" style={{ paddingRight: '30px' }}>
          {product.description}
        </p>
        <button
          className={`${buttonColor} text-white font-bold py-2 px-4 mt-2 rounded`}
          onClick={handleAddToCart}
          disabled={isButtonDisabled || cartMutation.isLoading}
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}

export default ViewProduct
