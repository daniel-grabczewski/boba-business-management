import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  deleteWishlistItemByProductId,
  getDisplayWishlistItems,
} from '../../../services/wishlist'
import LoadError from '../../components/LoadError/LoadError'
import { DisplayWishlistItem } from '../../../../models/Wishlist'
import { addItemToCartByProductId } from '../../../services/cart'
import { useState } from 'react'
import { formatCurrency } from '../../../utils/formatCurrency'
import { useNavigate } from 'react-router-dom'
import { baseURL } from '../../../../baseUrl'

const Wishlist = () => {
  const queryClient = useQueryClient()
  const [buttonStatus, setButtonStatus] = useState<{
    [key: number]: { text: string; color: string; disabled: boolean }
  }>({})
  const navigate = useNavigate()
  const goTo = (link: string) => {
    navigate(`${baseURL}${link}`)
  }

  const wishListQuery = useQuery('getDisplayWishlistItems', async () =>
    getDisplayWishlistItems()
  )

  const cartMutation = useMutation(
    async (productId: number) => addItemToCartByProductId(productId),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries('getDisplayCartItems'),
          setButtonStatus((prevStatus) => ({
            ...prevStatus,
            [variables]: {
              text: 'Item added',
              color: 'bg-green-500',
              disabled: true,
            },
          }))
        setTimeout(() => {
          setButtonStatus((prevStatus) => ({
            ...prevStatus,
            [variables]: {
              text: 'Add to cart',
              color:
                'bg-blue-500 hover:bg-blue-700 transition-all duration-300',
              disabled: true,
            },
          }))
          setTimeout(() => {
            setButtonStatus((prevStatus) => ({
              ...prevStatus,
              [variables]: {
                ...prevStatus[variables],
                disabled: false,
              },
            }))
          }, 200)
        }, 1000)
      },
      onError: (error) => {
        console.error('An error occurred:', error)
      },
    }
  )

  const removeMutation = useMutation(
    async ({ productId }: { productId: number }) =>
      deleteWishlistItemByProductId(productId),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries('getDisplayWishlistItems')
      },
    }
  )

  const handleAddToCart = (productId: number) => {
    if (buttonStatus[productId]?.disabled) return
    cartMutation.mutate(productId)
  }

  async function removeFromWishList(productId: number) {
    removeMutation.mutate({ productId })
  }

  return (
    <>
      <LoadError status={wishListQuery.status} />
      <div className="bg-white w-full flex flex-col items-center py-8 px-4">
        <div className="w-full sm:w-10/12 text-center mb-4">
          <h1 className="text-2xl sm:text-4xl font-semibold text-black">
            WISHLIST
          </h1>
        </div>
        {wishListQuery.data && wishListQuery.data.length === 0 ? (
          <div className="bg-white flex flex-col items-center justify-center mt-8">
            <h1 className="text-xl sm:text-3xl text-black mb-2">
              Your wishlist is empty 😔
            </h1>
            <button
              className="bg-gray-500 text-white p-4 w-auto whitespace-nowrap text-lg font-bold rounded-md transition-colors hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 mt-4"
              onClick={() => goTo('/shop')}
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <div className="bg-white w-full sm:w-3/4 flex flex-col items-center">
            {!wishListQuery.isLoading &&
              wishListQuery.data &&
              wishListQuery.data.map((item: DisplayWishlistItem) => (
                <div
                  key={item.id}
                  className="bg-white w-full flex flex-row items-center justify-between border-b border-gray-300 py-4"
                >
                  <div
                    className="flex items-center cursor-pointer flex-1"
                    onClick={() => goTo(`/shop/${item.productId}`)}
                  >
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="ml-4 flex flex-col">
                      <p className="text-sm sm:text-xl font-semibold text-black">
                        {item.productName}
                      </p>
                      <p className="mt-1 text-xs sm:text-base text-gray-700">
                        {formatCurrency(item.productPrice)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-6">
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <button
                        className={`w-24 text-xs sm:text-sm text-white py-1 rounded-md ${
                          buttonStatus[item.productId]?.color ||
                          'bg-blue-500 hover:bg-blue-700 transition-all duration-300'
                        }`}
                        onClick={() => handleAddToCart(item.productId)}
                        disabled={
                          cartMutation.isLoading ||
                          buttonStatus[item.productId]?.disabled
                        }
                      >
                        {buttonStatus[item.productId]?.text || 'Add to cart'}
                      </button>
                      <button
                        className="w-24 text-xs sm:text-sm text-red-500 hover:text-red-800 transition-all duration-300"
                        onClick={() => removeFromWishList(item.productId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Wishlist
