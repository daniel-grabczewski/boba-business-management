//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faHeart } from '@fortawesome/free-regular-svg-icons'
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
      <div className="bg-white w-full flex flex-col items-center py-8">
        <div className="w-10/12 text-center mb-4">
          <h1 className="text-4xl font-semibold text-black">WISHLIST</h1>
        </div>
        {wishListQuery.data && wishListQuery.data.length === 0 ? (
          <div className="bg-white flex flex-col items-center justify-center mt-8">
            <h1 className="text-3xl text-black mb-2">
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
          <div className="bg-white w-2/3 flex flex-col items-center">
            {!wishListQuery.isLoading &&
              wishListQuery.data &&
              wishListQuery.data.map((item: DisplayWishlistItem) => (
                <div
                  key={item.id}
                  className="bg-white w-3/5 flex flex-row gap-10 items-center justify-between border-b border-gray-300 py-4"
                  style={{ minWidth: '600px' }}
                >
                  <div
                    className="flex gap-8 items-center cursor-pointer"
                    onClick={() => goTo(`/shop/${item.productId}`)}
                  >
                    <div style={{ width: '80px' }}>
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        style={{ maxHeight: '100px', maxWidth: '80px' }}
                        className="w-full h-48 object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-black">
                        {item.productName}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-8 items-center">
                    <p className="font-semibold">
                      {formatCurrency(item.productPrice)}
                    </p>
                    <button
                      style={{
                        minWidth: '100px',
                        width: '100px',
                        marginRight: '-12px',
                      }}
                      className={` text-sm text-white p-2 rounded-md ${
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
                      className="flex flex-col items-center text-red-500 hover:text-red-800 transition-all duration-300"
                      onClick={() => removeFromWishList(item.productId)}
                    >
                      {/* Using a heart icon for a delete operation may be counterintuitive design
                      <FontAwesomeIcon icon={faHeart} className="text-2xl" />
                      */}
                      <p className="text-medium">Remove</p>
                    </button>
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
