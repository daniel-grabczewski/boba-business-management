import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  deleteWishlistItemByProductId,
  getDisplayWishlistItems,
} from '../../../services/wishlist'
import LoadError from '../../components/LoadError/LoadError'
import { DisplayWishlistItem } from '../../../../models/Wishlist'
import { addItemToCartByProductId } from '../../../services/cart'
import { useState } from 'react'

const Wishlist = () => {
  const queryClient = useQueryClient()
  const [buttonStatus, setButtonStatus] = useState<{
    [key: number]: { text: string; color: string }
  }>({})

  const wishListQuery = useQuery('getDisplayWishlistItems', async () =>
    getDisplayWishlistItems()
  )

  const cartMutation = useMutation(
    async (productId: number) => addItemToCartByProductId(productId),
    {
      onSuccess: (data, variables) => {
        setButtonStatus((prevStatus) => ({
          ...prevStatus,
          [variables]: { text: 'Item added', color: 'bg-gray-500' },
        }))
        setTimeout(() => {
          setButtonStatus((prevStatus) => ({
            ...prevStatus,
            [variables]: {
              text: 'Add to cart',
              color: 'bg-black hover:bg-gray-700',
            },
          }))
        }, 1000)
      },
      onError: (error) => {
        console.error('An error occurred:', error)
      },
    }
  )

  const romoveMutation = useMutation(
    async ({ productId }: { productId: number }) =>
      deleteWishlistItemByProductId(productId),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries('getDisplayWishlistItems')
      },
    }
  )

  const handleAddToCart = (productId: number) => {
    cartMutation.mutate(productId)
  }

  async function removeFromWishList(productId: number) {
    romoveMutation.mutate({ productId })
  }

  return (
    <>
      <LoadError status={wishListQuery.status} />
      <div className="bg-white w-full flex flex-col items-center py-8">
        <div className="w-10/12 text-center mb-4">
          <h1 className="text-4xl font-semibold text-black">WISHLIST</h1>
        </div>
        {wishListQuery.data && wishListQuery.data.length === 0 ? (
          <div className="bg-white w-10/12 flex flex-row gap-10 items-center border-b border-gray-300 py-4">
            <h1 className="text-2xl font-medium text-black">
              Your wishlist is empty 😔
            </h1>
          </div>
        ) : (
          <div className="bg-white w-10/12">
            {!wishListQuery.isLoading &&
              wishListQuery.data &&
              wishListQuery.data.map((item: DisplayWishlistItem) => (
                <div
                  key={item.id}
                  className="bg-white w-10/12 flex flex-row gap-10 items-center border-b border-gray-300 py-4"
                >
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-3/12 object-cover"
                  />
                  <h1 className="text-xl font-medium text-black w-3/12">
                    {item.productName}
                  </h1>
                  <h1 className="text-xl font-semibold text-black w-1/12">
                    ${item.productPrice.toFixed(2)}
                  </h1>

                  <button
                    className={`w-1/6 text-sm text-white p-2 rounded-md ${
                      buttonStatus[item.productId]?.color ||
                      'bg-black hover:bg-gray-700'
                    }`}
                    onClick={() => handleAddToCart(item.productId)}
                    disabled={cartMutation.isLoading}
                  >
                    {buttonStatus[item.productId]?.text || 'Add to cart'}
                  </button>
                  <button
                    className="flex flex-col items-center text-black hover:text-red-500 transition"
                    onClick={() => removeFromWishList(item.productId)}
                  >
                    <FontAwesomeIcon icon={faHeart} className="text-2xl" />
                    <p className="text-sm mt-1">Remove</p>
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Wishlist
