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

interface ViewProductProps {
  product: ShopperProduct
  wishlistStatus: boolean
  refetchIsProductInWishlistItemsByProductId: () => void
  averageRating : number
}

function ViewProduct({
  product,
  wishlistStatus,
  refetchIsProductInWishlistItemsByProductId,
  averageRating
}: ViewProductProps) {
  const [buttonText, setButtonText] = useState('Add to cart')
  const [buttonColor, setButtonColor] = useState(
    'bg-blue-500 hover:bg-blue-700'
  )

  const cartMutation = useMutation(
    async (productId: number) => 
      addItemToCartByProductId(productId)
    ,
    {
      onSuccess: () => {
        setButtonText('Item added')
        setButtonColor('bg-gray-500')
        setTimeout(() => {
          setButtonText('Add to cart')
          setButtonColor('bg-blue-500 hover:bg-blue-700')
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
    cartMutation.mutate(product.id)
  }

  const handleWishlistClick = () => {
    wishlistMutation.mutate()
  }

  return (
    <div className="flex items-center max-w-5xl" style={{ padding: '10px' }}>
      <div className="w-1/2">
        <img src={product.image} alt={product.name} className="w-full" />
      </div>
      <div className="w-1/2 ml-4">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <button className="flex items-center" onClick={handleWishlistClick}>
            <FontAwesomeIcon
              icon={wishlistStatus ? solidHeart : regularHeart}
              className={wishlistStatus ? 'text-red-500' : 'text-black'}
              style={{ fontSize: '1.875rem', marginLeft: '10px' }}
            />
            <span className="ml-2 self-center">
              {wishlistStatus ? 'Remove from wishlist' : 'Add to wishlist'}
            </span>
          </button>
        </div>

        <h2 className="text-xl font-bold">${product.price}</h2>
        <div className="flex">
          <StarRating rating={averageRating} size={1} />
          <p>{averageRating}</p>
        </div>

        <p className="mt-2">{product.description}</p>
        <button
          className={`${buttonColor} text-white font-bold py-2 px-4 mt-2 rounded`}
          onClick={handleAddToCart}
          disabled={cartMutation.isLoading}
        >
          {buttonText}
        </button>
        {cartMutation.isError ? <p>Please login to add to cart</p> : null}
      </div>
    </div>
  )
}

export default ViewProduct
